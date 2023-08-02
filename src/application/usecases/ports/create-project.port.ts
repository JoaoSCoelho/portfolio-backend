import { Project } from '../../../domain/entities/project'
import { Either } from '../../../shared/either'

export abstract class ICreateProjectUC {
  abstract execute(data: {
    name: string
    description: string
    link?: string
    repositoryUrl?: string
  }): Promise<Either<string, Project>>
}
