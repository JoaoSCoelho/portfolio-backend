import { Model } from 'mongoose'

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
}
