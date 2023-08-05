import { Technology } from '../../src/domain/entities/technology'
import { ITechnologiesRepository } from '../../src/external/repositories/ports/technologies-repository.port'

export class InMemoryTechnologiesRepository implements ITechnologiesRepository {
  db: Technology[]

  constructor() {
    this.db = []
  }

  existsWithAllTheseNames: ITechnologiesRepository['existsWithAllTheseNames'] =
    async (names) => {
      return names.every((name) => this.db.find((v) => v.name === name))
    }

  create: ITechnologiesRepository['create'] = async (technology) => {
    this.db.push(technology)
  }

  all: ITechnologiesRepository['all'] = async () => {
    return this.db
  }
}
