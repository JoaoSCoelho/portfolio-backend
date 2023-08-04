import { randomUUID } from 'crypto'
import { Model } from 'mongoose'

import { Project } from '../../../../domain/entities/project'
import { everyIsRight } from '../../../../shared/either'
import { slugify } from '../../../../shared/slugify'
import { IProjectsRepository } from '../../ports/projects-repository.port'

export class MongoProjectsRepository implements IProjectsRepository {
  constructor(private readonly model: Model<{ [x: string]: any }>) {}

  all: IProjectsRepository['all'] = async () => {
    const dbProjects = await this.model.find()

    {
      // Remover esse bloco quando todos os dados do banco estiverem no novo formato do project
      const oldFormatDbProjects = dbProjects.filter(
        (dbP) =>
          dbP.usedTechnologies === undefined ||
          dbP.features === undefined ||
          dbP.keywords === undefined ||
          dbP.slug === undefined,
      )

      if (oldFormatDbProjects.length) {
        await this.model.updateMany(
          { usedTechnologies: undefined },
          { usedTechnologies: [] },
        )
        await this.model.updateMany({ features: undefined }, { features: [] })
        await this.model.updateMany({ keywords: undefined }, { keywords: [] })
        await Promise.all(
          oldFormatDbProjects
            .filter((dbP) => dbP.slug === undefined)
            .map(
              async (dbP) =>
                await this.model.updateMany(
                  { id: dbP.id },
                  { slug: slugify(randomUUID()) },
                ),
            ),
        )

        return this.all()
      }
    }

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
