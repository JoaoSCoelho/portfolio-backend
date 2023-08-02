import { Project } from '../../../domain/entities/project'
import { Either } from '../../../shared/either'

export abstract class IGetProjectsUC {
  abstract execute(): Promise<Either<string, Project[]>>
}
