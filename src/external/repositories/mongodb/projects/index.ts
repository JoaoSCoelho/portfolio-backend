import { Model } from 'mongoose'

import { Project } from '../../../../domain/entities/project'
import { everyIsRight, isLeft, left } from '../../../../shared/either'
import { IProjectsRepository } from '../../ports/projects-repository.port'

export class MongoProjectsRepository implements IProjectsRepository {
  constructor(private readonly model: Model<{ [x: string]: any }>) {}

  all: IProjectsRepository['all'] = async () => {
    const dbProjects = await this.model.find()

    const projects = dbProjects.map(
      ({
        name,
        description,
        repositoryUrl,
        link,
        usedTechnologies,
        features,
        keywords,
        slug,
        bannerUrl,
        previewImageUrl,
        id,
        createdAt,
        updatedAt,
      }) =>
        Project.create({
          name,
          description,
          repositoryUrl,
          link,
          usedTechnologies,
          features,
          keywords,
          slug,
          bannerUrl,
          previewImageUrl,
          id,
          createdAt: new Date(createdAt),
          updatedAt: new Date(updatedAt),
        }),
    )

    if (!everyIsRight(projects)) throw new Error()

    return projects
  }

  create: IProjectsRepository['create'] = async (project) => {
    await this.model.create(project)
  }

  existsWithThisSlug: IProjectsRepository['existsWithThisSlug'] = async (
    slug,
  ) => {
    const exists = await this.model.exists({ slug })

    if (exists === null) return false

    return true
  }

  update: IProjectsRepository['update'] = async (id, obj, propsToRemove) => {
    const updatedDbProject = await this.model.findOneAndUpdate(
      { id },
      {
        ...obj,
        $unset:
          propsToRemove?.reduce(
            (prevObj, prop) => ({ ...prevObj, [prop]: '' }),
            {},
          ) ?? {},
      },
      {
        new: true,
      },
    )

    if (updatedDbProject === null) return left('Não existe project com este id')

    const project = Project.create({
      name: updatedDbProject.name,
      description: updatedDbProject.description,
      repositoryUrl: updatedDbProject.repositoryUrl,
      link: updatedDbProject.link,
      usedTechnologies: updatedDbProject.usedTechnologies,
      features: updatedDbProject.features,
      keywords: updatedDbProject.keywords,
      slug: updatedDbProject.slug,
      bannerUrl: updatedDbProject.bannerUrl,
      previewImageUrl: updatedDbProject.previewImageUrl,
      id: updatedDbProject.id,
      createdAt: updatedDbProject.createdAt,
      updatedAt: updatedDbProject.updatedAt,
    })

    if (isLeft(project)) throw new Error()

    return project
  }

  removeProps: IProjectsRepository['removeProps'] = async (id, props) => {
    const updatedDbProject = await this.model.findOneAndUpdate(
      { id },
      {
        $unset: props.reduce(
          (prevObj, prop) => ({ ...prevObj, [prop]: '' }),
          {},
        ),
      },
      { new: true },
    )

    if (updatedDbProject === null) return left('Não existe project com este id')

    const project = Project.create({
      name: updatedDbProject.name,
      description: updatedDbProject.description,
      repositoryUrl: updatedDbProject.repositoryUrl,
      link: updatedDbProject.link,
      usedTechnologies: updatedDbProject.usedTechnologies,
      features: updatedDbProject.features,
      keywords: updatedDbProject.keywords,
      slug: updatedDbProject.slug,
      bannerUrl: updatedDbProject.bannerUrl,
      previewImageUrl: updatedDbProject.previewImageUrl,
      id: updatedDbProject.id,
      createdAt: updatedDbProject.createdAt,
      updatedAt: updatedDbProject.updatedAt,
    })

    if (isLeft(project)) throw new Error()

    return project
  }
}
