import { Feature } from '../../domain/aggregates/value-objects/feature'
import { ID } from '../../domain/aggregates/value-objects/id'
import { Keyword } from '../../domain/aggregates/value-objects/keyword'
import { List } from '../../domain/aggregates/value-objects/list'
import { ProjectDescription } from '../../domain/aggregates/value-objects/project-description'
import { ProjectName } from '../../domain/aggregates/value-objects/project-name'
import { Slug } from '../../domain/aggregates/value-objects/slug'
import { TechnologyName } from '../../domain/aggregates/value-objects/technology-name'
import { WebUrl } from '../../domain/aggregates/value-objects/web-url'
import { Project } from '../../domain/entities/project'
import { IProjectsRepository } from '../../external/repositories/ports/projects-repository.port'
import { ITechnologiesRepository } from '../../external/repositories/ports/technologies-repository.port'
import { isLeft, left } from '../../shared/either'
import { IUpdateProjectUC } from './ports/update-project.usecase.port'

export class UpdateProjectUC implements IUpdateProjectUC {
  constructor(
    private readonly projectsRepository: IProjectsRepository,
    private readonly technologiesRepository: ITechnologiesRepository,
  ) {}

  execute: IUpdateProjectUC['execute'] = async (_id, data) => {
    // Verifica se o id é válido
    const id = ID.create(_id)

    if (isLeft(id)) return left('id inválido')

    // Verifica cada propriedade -----------------------------------------
    const name =
      data.name !== undefined ? ProjectName.create(data.name) : data.name

    if (isLeft(name)) return left('Problema no name: >> ' + name.value)

    const description =
      data.description !== undefined
        ? ProjectDescription.create(data.description)
        : data.description

    if (isLeft(description))
      return left('Problema no description: >> ' + description.value)

    const usedTechnologies =
      data.usedTechnologies !== undefined
        ? List.create(data.usedTechnologies, TechnologyName)
        : data.usedTechnologies

    if (isLeft(usedTechnologies))
      return left('Problema no usedTechnologies: >> ' + usedTechnologies.value)

    const features =
      data.features !== undefined
        ? List.create(data.features, Feature)
        : data.features

    if (isLeft(features))
      return left('Problema no features: >> ' + features.value)

    const keywords =
      data.keywords !== undefined
        ? List.create(data.keywords, Keyword)
        : data.keywords

    if (isLeft(keywords))
      return left('Problema no keywords: >> ' + keywords.value)

    const slug = data.slug !== undefined ? Slug.create(data.slug) : data.slug

    if (isLeft(slug)) return left('Problema no slug: >> ' + slug.value)

    const repositoryUrl =
      data.repositoryUrl !== undefined
        ? data.repositoryUrl === null
          ? null
          : WebUrl.create(data.repositoryUrl)
        : data.repositoryUrl

    if (isLeft(repositoryUrl))
      return left('Problema no repositoryUrl: >> ' + repositoryUrl.value)

    const link =
      data.link !== undefined
        ? data.link === null
          ? null
          : WebUrl.create(data.link)
        : data.link

    if (isLeft(link)) return left('Problema no link: >> ' + link.value)

    const bannerUrl =
      data.bannerUrl !== undefined
        ? data.bannerUrl === null
          ? null
          : WebUrl.create(data.bannerUrl)
        : data.bannerUrl

    if (isLeft(bannerUrl))
      return left('Problema no bannerUrl: >> ' + bannerUrl.value)

    const previewImageUrl =
      data.previewImageUrl !== undefined
        ? data.previewImageUrl === null
          ? null
          : WebUrl.create(data.previewImageUrl)
        : data.previewImageUrl

    if (isLeft(previewImageUrl))
      return left('Problema no previewImageUrl: >> ' + previewImageUrl.value)

    // Verifica se já existe com este slug
    if (slug !== undefined) {
      const existsWithThisSlug =
        await this.projectsRepository.existsWithThisSlug(slug)

      if (existsWithThisSlug)
        return left('Já existe outro project com esse slug')
    }

    // Verifica se existem todas as tecnologias citadas no banco
    if (usedTechnologies !== undefined) {
      const existsTheseTechnologies =
        await this.technologiesRepository.existsWithAllTheseNames(
          usedTechnologies,
        )

      if (!existsTheseTechnologies)
        return left('Tem tecnologia aí que eu não conheço')
    }

    const propsToRemove = Object.entries({
      bannerUrl,
      link,
      previewImageUrl,
      repositoryUrl,
    })
      .filter(([_propName, propValue]) => propValue === null)
      .map(([propName]) => propName) as (keyof Project)[]

    // Atualiza o project
    const updatedProject = await this.projectsRepository.update(
      id,
      {
        bannerUrl: bannerUrl === null ? undefined : bannerUrl,
        link: link === null ? undefined : link,
        previewImageUrl: previewImageUrl === null ? undefined : previewImageUrl,
        repositoryUrl: repositoryUrl === null ? undefined : repositoryUrl,
        description,
        features,
        keywords,
        name,
        slug,
        usedTechnologies,
        updatedAt: new Date(),
      },
      propsToRemove.length ? propsToRemove : undefined,
    )

    if (isLeft(updatedProject))
      return left('Erro ao atualizar o project: >> ' + updatedProject.value)

    return updatedProject
  }
}
