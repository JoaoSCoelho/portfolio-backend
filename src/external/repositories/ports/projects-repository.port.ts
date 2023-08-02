import { Project } from '../../../domain/entities/project'

export interface IProjectsRepository {
  all: () => Promise<Project[]>
}
