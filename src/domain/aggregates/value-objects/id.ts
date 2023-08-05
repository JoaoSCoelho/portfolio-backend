import { Either, left } from '../../../shared/either'
import { IValueObject } from './ports/value-object.port'

export class ID extends String implements IValueObject {
  static type = 'string'

  static create(id: string): Either<string, ID> {
    if (typeof id !== this.type)
      return left('O tipo disso aí não tem nada a ver')

    return String(id)
  }
}
