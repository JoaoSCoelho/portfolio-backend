import { Either, left } from '../../../shared/either'

export class WebUrl extends String {
  static type = 'string'
  static maximumLength = 32768
  static structure = () => /^((http)|(https)):\/\/.+\..+(\/.+)?$/gi

  static create(webUrl: string): Either<string, WebUrl> {
    if (typeof webUrl !== this.type) return left('O tipo disso aí não tem nada a ver')
    if (webUrl.length > this.maximumLength) return left('Ta exagerado bro, caractere demais')
    if (!this.structure().test(webUrl)) return left('Isso não é uma url nem aqui nem na *****')

    return String(webUrl)
  }
}
