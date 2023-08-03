import { Either, left } from '../../../shared/either'
import { IValueObject } from './ports/value-object.port'

export class Moment extends Date implements IValueObject {
  static type = 'object'

  static create(moment: Date): Either<string, Moment> {
    if (typeof moment !== this.type)
      return left('O tipo disso aí não tem nada a ver')
    if (!(moment instanceof Date))
      return left('Se não instancia Date não é data parceiro')
    if (isNaN(moment.getTime())) return left('Isso só data em outro mundo')

    return new Moment(moment)
  }
}
