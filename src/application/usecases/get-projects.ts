import { IProjectsRepository } from '../../external/repositories/ports/projects-repository.port'
import { IGetProjectsUC } from './ports/get-projects.port'
export class GetProjectsUC implements IGetProjectsUC {
  constructor(private readonly projectsRepository: IProjectsRepository) {}

  async execute(): ReturnType<IGetProjectsUC['execute']> {
    const projects = await this.projectsRepository.all()

    return projects
  }
}
