import { Either, left } from '../../../shared/either'
import { IValueObject } from './ports/value-object.port'

export class Slug extends String implements IValueObject {
  static type = 'string'
  static structure = () => /^[a-z0-9]+(?:-[a-z0-9]+)*$/gm

  static create(slug: string): Either<string, Slug> {
    if (typeof slug !== this.type)
      return left('O tipo disso aí não tem nada a ver')
    if (!this.structure().test(slug)) return left('Isso daí não é um slug')

    return String(slug)
  }
}
