import { Either, left } from '../../../shared/either'
import { IValueObject } from './ports/value-object.port'

export class ProjectName extends String implements IValueObject {
  static type = 'string'
  static maximumLength = 2048

  static create(projectName: string): Either<string, ProjectName> {
    if (typeof projectName !== this.type)
      return left('O tipo disso aí não tem nada a ver')
    if (projectName.length > this.maximumLength)
      return left('Ta exagerado bro, caractere demais')

    return String(projectName)
  }
}
