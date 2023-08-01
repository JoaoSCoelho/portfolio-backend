import { Either, left } from '../../../shared/either'

export class ProjectDescription extends String {
  static type = 'string'
  static maximumLength = 8192

  static create(
    projectDescription: string,
  ): Either<string, ProjectDescription> {
    if (typeof projectDescription !== this.type) return left('Tipo inválido')
    if (projectDescription.length > this.maximumLength)
      return left('Muito longo')

    return String(projectDescription)
  }
}
