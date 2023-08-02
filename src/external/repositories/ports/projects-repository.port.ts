import { Project } from '../../../domain/entities/project'

export type AllReturn = Promise<Project[]>
export type All = () => AllReturn

export interface IProjectsRepository {
  all: All
}
