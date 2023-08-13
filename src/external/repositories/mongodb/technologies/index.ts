import { Model } from 'mongoose'

import { Technology } from '../../../../domain/entities/technology'
import { everyIsRight } from '../../../../shared/either'
import { ITechnologiesRepository } from '../../ports/technologies-repository.port'

export class MongoTechnologiesRepository implements ITechnologiesRepository {
  constructor(private readonly model: Model<{ [x: string]: any }>) {}

  existsWithAllTheseNames: ITechnologiesRepository['existsWithAllTheseNames'] =
    async (names) => {
      const exists = await Promise.all(
        names.map(async (name) => await this.model.findOne({ name })),
      )

      if (exists.findIndex((v) => v === null) !== -1) return false

      return true
    }

  create: ITechnologiesRepository['create'] = async (technology) => {
    await this.model.create(technology)
  }

  all: ITechnologiesRepository['all'] = async () => {
    const dbTechnologies = await this.model.find()

    const technologies = dbTechnologies.map(
      ({ name, aliases, keywords, logoUrl, id, createdAt, updatedAt }) =>
        Technology.create({
          name,
          aliases,
          keywords,
          logoUrl,
          id,
          createdAt,
          updatedAt,
        }),
    )

    if (!everyIsRight(technologies)) throw new Error()

    return technologies
  }

  existsWithThisName: ITechnologiesRepository['existsWithThisName'] = async (
    name,
  ) => {
    const exists = await this.model.exists({ name })

    if (exists === null) return false

    return true
  }
}
