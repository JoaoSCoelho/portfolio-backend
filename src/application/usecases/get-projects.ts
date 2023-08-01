import { Project } from '../../domain/entities/project'
import { IProjectsRepository } from '../../external/repositories/ports/projects-repository'

type ExecuteReturn = Promise<Project[]>
type Execute = () => ExecuteReturn

export interface IGetProjectsUC {
  execute: Execute
}

export class GetProjects implements IGetProjectsUC {
  constructor(private readonly projectsRepository: IProjectsRepository) {}

  execute: Execute = async () => {
    const projects = await this.projectsRepository.all()

    return projects
  }
}
