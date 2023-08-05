import { ID } from '../../../domain/aggregates/value-objects/id'
import { Slug } from '../../../domain/aggregates/value-objects/slug'
import { Project } from '../../../domain/entities/project'
import { Either } from '../../../shared/either'

export interface IProjectsRepository {
  all: () => Promise<Project[]>
  create: (project: Project) => Promise<void>
  existsWithThisSlug: (slug: Slug) => Promise<boolean>
  update: (
    id: ID,
    obj: Partial<Project>,
    propsToRemove?: (keyof Project)[],
  ) => Promise<Either<string, Project>>
  removeProps: (
    id: ID,
    props: (keyof Project)[],
  ) => Promise<Either<string, Project>>
}
