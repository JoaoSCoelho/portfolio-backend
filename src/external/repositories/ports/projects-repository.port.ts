import { Project } from '../../../domain/entities/project'

export interface IProjectsRepository {
  all: () => Promise<Project[]>
  create: (project: Project) => Promise<void>
  existsWithThisSlug: (slug: string) => Promise<boolean>
}
