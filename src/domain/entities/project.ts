import { Entity } from '../../core/domain/Entity'

interface IProjectProps {
  readonly name: ProjectName
  readonly description: ProjectDescription
  readonly repositoryURL?: WebUrl
  readonly link?: WebUrl
}

export class Project extends Entity implements IProjectProps {
  private constructor(
    public readonly name: ProjectName,
    public readonly description: ProjectDescription,
    public readonly repositoryURL?: WebUrl,
    public readonly link?: WebUrl,
    ...params: Required<ConstructorParameters<typeof Entity>> | []
  ) {
    super(...params)
    Object.freeze(this)
  }

  static create() {}
}
