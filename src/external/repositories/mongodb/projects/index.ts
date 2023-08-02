import { Model } from 'mongoose'

import { Project } from '../../../../domain/entities/project'
import { everyIsRight } from '../../../../shared/either'
import { IProjectsRepository } from '../../ports/projects-repository.port'

export class MongoProjectsRepository implements IProjectsRepository {
  constructor(private readonly model: Model<{ [x: string]: any }>) {}

  all: IProjectsRepository['all'] = async () => {
    const dbProjects = await this.model.find()

    const projects = dbProjects.map(
      ({ name, description, repositoryUrl, link, id, createdAt, updatedAt }) =>
        Project.create(
          name,
          description,
          repositoryUrl,
          link,
          id,
          createdAt,
          updatedAt,
        ),
    )

    if (!everyIsRight(projects)) throw new Error()

    return projects
  }
}
