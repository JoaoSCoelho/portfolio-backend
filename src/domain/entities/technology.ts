import { Entity, EntityDTO, EntityParams } from '../../core/domain/entity'
import { Either, isLeft, left } from '../../shared/either'
import { ID } from '../aggregates/value-objects/id'
import { Keyword } from '../aggregates/value-objects/keyword'
import { List } from '../aggregates/value-objects/list'
import { Moment } from '../aggregates/value-objects/moment'
import { TechnologyName } from '../aggregates/value-objects/technology-name'
import { WebUrl } from '../aggregates/value-objects/web-url'

export class Technology extends Entity {
  private constructor(
    public readonly name: TechnologyName,
    public readonly keywords: List<Keyword>,
    public readonly aliases: List<TechnologyName>,
    public readonly logoUrl?: WebUrl,
    ...params: EntityParams
  ) {
    super(...params)
    Object.freeze(this)
  }

  static create(
    _name: string,
    _keywords?: string[],
    _aliases?: string[],
    _logoUrl?: string,
    ...params: EntityDTO
  ): Either<string, Technology> {
    // Verifica para uma nova entidade ----------------------------------------

    const name = TechnologyName.create(_name)
    if (isLeft(name)) return left('name: >> ' + name.value)

    let keywords =
      _keywords !== undefined ? List.create(_keywords, Keyword) : []
    if (isLeft(keywords)) return left('keywords: >> ' + keywords.value)

    let aliases =
      _aliases !== undefined ? List.create(_aliases, TechnologyName) : []
    if (isLeft(aliases)) return left(`aliases: >> ${aliases.value}`)

    const logoUrl = _logoUrl !== undefined ? WebUrl.create(_logoUrl) : undefined
    if (isLeft(logoUrl)) return left(`logoUrl: >> ${logoUrl.value}`)

    if (!params.length) return new Technology(name, keywords, aliases, logoUrl)

    // Verifica para uma entidade já existente ----------------------------------------

    const [_id, _createdAt, _updatedAt] = params

    const id = ID.create(_id)
    if (isLeft(id)) return left('id: >> ' + id.value)

    const createdAt = Moment.create(_createdAt)
    if (isLeft(createdAt)) return left('createdAt: >> ' + createdAt.value)

    const updatedAt = Moment.create(_updatedAt)
    if (isLeft(updatedAt)) return left('updatedAt: >> ' + updatedAt.value)

    keywords = List.create(_keywords as string[], Keyword)
    if (isLeft(keywords)) return left('keywords: >> ' + keywords.value)

    aliases = List.create(_aliases as string[], TechnologyName)
    if (isLeft(aliases)) return left('aliases: >> ' + aliases.value)

    return new Technology(
      name,
      keywords,
      aliases,
      logoUrl,
      id,
      createdAt,
      updatedAt,
    )
  }
}
