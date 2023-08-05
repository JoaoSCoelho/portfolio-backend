import { Project } from '../../domain/entities/project'
import { IProjectsRepository } from '../../external/repositories/ports/projects-repository.port'
import { ITechnologiesRepository } from '../../external/repositories/ports/technologies-repository.port'
import { isLeft, left } from '../../shared/either'
import { slugify } from '../../shared/slugify'
import { ICreateProjectUC } from './ports/create-project.usecase.port'

export class CreateProjectUC implements ICreateProjectUC {
  constructor(
    private readonly projectsRepository: IProjectsRepository,
    private readonly technologiesRepository: ITechnologiesRepository,
  ) {}

  execute: ICreateProjectUC['execute'] = async (data) => {
    // Instancia o Project
    let project = Project.create(data)

    if (isLeft(project))
      return left('Deu merda aqui instanciando o project: >> ' + project.value)

    // Confere se tem outro project com o mesmo slug

    const existsWithThisSlug = await this.projectsRepository.existsWithThisSlug(
      project.slug,
    )

    if (existsWithThisSlug) {
      if (data.slug === undefined) {
        project = Project.create({
          ...data,
          slug: slugify(data.name + '-' + project.id),
        })

        if (isLeft(project)) throw new Error()
      } else {
        return left('Já existe um project com esse slug')
      }
    }

    // Confere se as tecnologias existem
    if (
      !(await this.technologiesRepository.existsWithAllTheseNames(
        project.usedTechnologies as string[],
      ))
    ) {
      return left('Tem tecnologia aí que eu não reconheço!')
    }

    // Salva no banco
    await this.projectsRepository.create(project)

    return project
  }
}
