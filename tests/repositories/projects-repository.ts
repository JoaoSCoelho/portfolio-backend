import { Project } from "../../src/domain/entities/project";
import { All, IProjectsRepository } from "../../src/external/repositories/ports/projects-repository";

export class InMemoryProjectsRepository implements IProjectsRepository {
  private db: Project[]

  constructor() {
    this.db = []
  }

  all: All = async () => {
    return this.db
  };
}