import { Technology, TechnologyDTO } from '../../../domain/entities/technology'
import { Either } from '../../../shared/either'

export abstract class ICreateTechnologyUC {
  abstract execute(data: TechnologyDTO): Promise<Either<string, Technology>>
}
