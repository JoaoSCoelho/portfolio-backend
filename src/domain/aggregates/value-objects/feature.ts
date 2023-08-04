import { Either, left } from '../../../shared/either'
import { IValueObject } from './ports/value-object.port'

export class Feature extends String implements IValueObject {
  static type = 'string'
  static maximumLength = 4096

  static create(feature: string): Either<string, Feature> {
    if (typeof feature !== this.type)
      return left('O tipo disso aí não tem nada a ver')
    if (feature.length > this.maximumLength)
      return left('Ta exagerado bro, caractere demais')

    return String(feature)
  }
}
