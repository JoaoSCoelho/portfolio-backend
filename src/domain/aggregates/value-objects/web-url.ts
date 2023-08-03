import { Either, left } from '../../../shared/either'
import { IValueObject } from './ports/value-object.port'

export class WebUrl extends String implements IValueObject {
  static type = 'string'
  static maximumLength = 32768
  static structure = () => /^((http)|(https)):\/\/.+\..+(\/.+)?$/gi

  static create(webUrl: string): Either<string, WebUrl> {
    if (typeof webUrl !== this.type)
      return left('O tipo disso aí não tem nada a ver')
    if (webUrl.length > this.maximumLength)
      return left('Ta exagerado bro, caractere demais')
    if (!this.structure().test(webUrl))
      return left('Isso não é uma url nem aqui nem na *****')

    return String(webUrl)
  }
}
