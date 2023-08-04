import { Technology } from '../../../domain/entities/technology'
import { Either } from '../../../shared/either'

export abstract class ICreateTechnologyUC {
  abstract execute(data: {
    name: string
    keywords?: string[]
    aliases?: string[]
    logoUrl?: string
  }): Promise<Either<string, Technology>>
}
