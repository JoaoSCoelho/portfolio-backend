import { Either, left } from '../../../shared/either'

export class Moment extends Date {
  static type = 'object'

  static create(moment: Date): Either<string, Moment> {
    if (typeof moment !== this.type) return left('Tipo inválido')
    if (!(moment instanceof Date)) return left('Não é uma data')
    if (isNaN(moment.getTime())) return left('Data inválida')

    return new Moment(moment)
  }
}
