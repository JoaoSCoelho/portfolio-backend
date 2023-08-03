import { Project } from '../../domain/entities/project'
import { IProjectsRepository } from '../../external/repositories/ports/projects-repository.port'
import { isLeft, left } from '../../shared/either'
import { ICreateProjectUC } from './ports/create-project.usecase.port'

export class CreateProjectUC implements ICreateProjectUC {
  constructor(private readonly projectsRepository: IProjectsRepository) {}

  execute: ICreateProjectUC['execute'] = async ({
    name,
    description,
    repositoryUrl,
    link,
  }) => {
    // Instancia o Project
    const project = Project.create(name, description, repositoryUrl, link)

    if (isLeft(project))
      return left('Deu merda aqui instanciando o project: →→ ' + project.value)

    // Salva no banco
    await this.projectsRepository.create(project)

    return project
  }
}
