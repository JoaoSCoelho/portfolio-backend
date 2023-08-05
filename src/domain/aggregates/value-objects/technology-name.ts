import { Either, left } from '../../../shared/either'
import { IValueObject } from './ports/value-object.port'

export class TechnologyName extends String implements IValueObject {
  static type = 'string'
  static maximumLength = 50

  static create(technologyName: string): Either<string, TechnologyName> {
    if (typeof technologyName !== this.type)
      return left('O tipo disso aí não tem nada a ver')
    if (technologyName.length > this.maximumLength)
      return left('Ta exagerado bro, caractere demais')

    return String(technologyName)
  }
}
