import { Model } from 'mongoose'

import { Project } from '../../../../domain/entities/project'
import { everyIsRight } from '../../../../shared/either'
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
}
