import { Either, left } from '../../../shared/either'

export class WebUrl extends String {
  static type = 'string'
  static maximumLength = 32768
  static structure = () => /^((http)|(https)):\/\/.+\..+(\/.+)?$/gi

  static create(webUrl: string): Either<string, WebUrl> {
    if (typeof webUrl !== this.type) return left('Tipo inválido')
    if (webUrl.length > this.maximumLength) return left('Muito longo')
    if (!this.structure().test(webUrl)) return left('Estrutura inválida')

    return String(webUrl)
  }
}
