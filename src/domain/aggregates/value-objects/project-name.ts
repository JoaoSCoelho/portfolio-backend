import { Either, left } from '../../../shared/either'

export class ProjectName extends String {
  static type = 'string'
  static maximumLength = 2048

  static create(projectName: string): Either<string, ProjectName> {
    if (typeof projectName !== this.type) return left('Tipo inválido')
    if (projectName.length > this.maximumLength) return left('Muito longo')

    return String(projectName)
  }
}
