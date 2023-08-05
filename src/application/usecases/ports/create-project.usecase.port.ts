import { Project, ProjectDTO } from '../../../domain/entities/project'
import { Either } from '../../../shared/either'

export abstract class ICreateProjectUC {
  abstract execute(data: ProjectDTO): Promise<Either<string, Project>>
}
