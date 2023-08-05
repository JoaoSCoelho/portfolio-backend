import { Technology } from '../../../domain/entities/technology'
import { Either } from '../../../shared/either'

export abstract class IGetTechnologiesUC {
  abstract execute(): Promise<Either<string, Technology[]>>
}
