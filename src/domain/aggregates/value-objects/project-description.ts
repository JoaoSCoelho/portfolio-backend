import { Either, left } from '../../../shared/either'
import { IValueObject } from './ports/value-object.port'

export class ProjectDescription extends String implements IValueObject {
  static type = 'string'
  static maximumLength = 8192

  static create(
    projectDescription: string,
  ): Either<string, ProjectDescription> {
    if (typeof projectDescription !== this.type)
      return left('O tipo disso aí não tem nada a ver')
    if (projectDescription.length > this.maximumLength)
      return left('Ta exagerado bro, caractere demais')

    return String(projectDescription)
  }
}
