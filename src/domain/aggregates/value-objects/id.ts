import { Either, left } from '../../../shared/either'

export class ID extends String {
  static type = 'string'

  static create(id: string): Either<string, ID> {
    if (typeof id !== this.type) return left('O tipo disso aí não tem nada a ver')

    return String(id)
  }
}
