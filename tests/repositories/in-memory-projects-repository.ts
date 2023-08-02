import { Project } from '../../src/domain/entities/project'
import { IProjectsRepository } from '../../src/external/repositories/ports/projects-repository.port'

export class InMemoryProjectsRepository implements IProjectsRepository {
  db: Project[]

  constructor() {
    this.db = []
  }

  all = async () => {
    return this.db
  }

  create: IProjectsRepository['create'] = async (project) => {
    this.db.push(project)
  }
}
