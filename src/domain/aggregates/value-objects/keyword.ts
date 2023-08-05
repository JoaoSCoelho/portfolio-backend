import { Either, left } from '../../../shared/either'
import { IValueObject } from './ports/value-object.port'

export class Keyword extends String implements IValueObject {
  static type = 'string'
  static maximumLength = 189819

  static create(keyword: string): Either<string, Keyword> {
    if (typeof keyword !== this.type)
      return left('O tipo disso aí não tem nada a ver')
    if (keyword.length > this.maximumLength)
      return left('Ta exagerado bro, caractere demais')
    if (keyword.split(' ').length > 1) return left('É pra ser UMA palavra fi')

    return String(keyword)
  }
}
