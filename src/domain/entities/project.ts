import { Entity, EntityDTO, EntityParams } from '../../core/domain/entity'
import { Either, isLeft } from '../../shared/either'
import { ID } from '../aggregates/value-objects/id'
import { Moment } from '../aggregates/value-objects/moment'
import { ProjectDescription } from '../aggregates/value-objects/project-description'
import { ProjectName } from '../aggregates/value-objects/project-name'
import { WebUrl } from '../aggregates/value-objects/web-url'

export class Project extends Entity {
  private constructor(
    public readonly name: ProjectName,
    public readonly description: ProjectDescription,
    public readonly repositoryUrl?: WebUrl,
    public readonly link?: WebUrl,
    ...params: EntityParams
  ) {
    super(...params)
    Object.freeze(this)
  }

  static create(
    _name: string,
    _description: string,
    _repositoryUrl?: string,
    _link?: string,
    ...params: EntityDTO
  ): Either<string, Project> {
    // Verifica para uma nova entidade ----------------------------------------

    const name = ProjectName.create(_name)
    if (isLeft(name)) return name

    const description = ProjectDescription.create(_description)
    if (isLeft(description)) return description

    const repositoryUrl =
      _repositoryUrl !== undefined ? WebUrl.create(_repositoryUrl) : undefined
    if (isLeft(repositoryUrl)) return repositoryUrl

    const link = _link !== undefined ? WebUrl.create(_link) : undefined
    if (isLeft(link)) return link

    if (!params.length)
      return new Project(name, description, repositoryUrl, link)

    // Verifica para uma entidade já existente ----------------------------------------

    const [_id, _createdAt, _updatedAt] = params

    const id = ID.create(_id)
    if (isLeft(id)) return id

    const createdAt = Moment.create(_createdAt)
    if (isLeft(createdAt)) return createdAt

    const updatedAt = Moment.create(_updatedAt)
    if (isLeft(updatedAt)) return updatedAt

    return new Project(
      name,
      description,
      repositoryUrl,
      link,
      id,
      createdAt,
      updatedAt,
    )
  }
}
