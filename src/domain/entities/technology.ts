import { Entity, EntityDTO, EntityParams } from '../../core/domain/entity'
import { Either, isLeft, left } from '../../shared/either'
import { ID } from '../aggregates/value-objects/id'
import { Keyword } from '../aggregates/value-objects/keyword'
import { List } from '../aggregates/value-objects/list'
import { Moment } from '../aggregates/value-objects/moment'
import { TechnologyName } from '../aggregates/value-objects/technology-name'
import { WebUrl } from '../aggregates/value-objects/web-url'

export type TechnologyDTO = {
  name: string
  keywords?: string[]
  aliases?: string[]
  logoUrl?: string
}

type TechnologyCreateDTO = EntityDTO & TechnologyDTO

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

  static create({
    name: _name,
    keywords: _keywords,
    aliases: _aliases,
    logoUrl: _logoUrl,
    id: _id,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
  }: TechnologyCreateDTO): Either<string, Technology> {
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

    if (!_id && !_createdAt && !_updatedAt)
      return new Technology(name, keywords, aliases, logoUrl)

    // Verifica para uma entidade já existente ----------------------------------------

    const id = ID.create(_id!)
    if (isLeft(id)) return left('id: >> ' + id.value)

    const createdAt = Moment.create(_createdAt!)
    if (isLeft(createdAt)) return left('createdAt: >> ' + createdAt.value)

    const updatedAt = Moment.create(_updatedAt!)
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
