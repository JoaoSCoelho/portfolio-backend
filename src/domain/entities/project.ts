import { Entity, EntityDTO, EntityParams } from '../../core/domain/entity'
import { Either, isLeft, left } from '../../shared/either'
import { slugify } from '../../shared/slugify'
import { Feature } from '../aggregates/value-objects/feature'
import { ID } from '../aggregates/value-objects/id'
import { Keyword } from '../aggregates/value-objects/keyword'
import { List } from '../aggregates/value-objects/list'
import { Moment } from '../aggregates/value-objects/moment'
import { ProjectDescription } from '../aggregates/value-objects/project-description'
import { ProjectName } from '../aggregates/value-objects/project-name'
import { Slug } from '../aggregates/value-objects/slug'
import { TechnologyName } from '../aggregates/value-objects/technology-name'
import { WebUrl } from '../aggregates/value-objects/web-url'

export type ProjectDTO = EntityDTO & {
  name: string
  description: string
  usedTechnologies?: string[]
  features?: string[]
  keywords?: string[]
  slug?: string
  repositoryUrl?: string
  link?: string
  bannerUrl?: string
  previewImageUrl?: string
}

export class Project extends Entity {
  private constructor(
    public readonly name: ProjectName,
    public readonly description: ProjectDescription,
    public readonly usedTechnologies: List<TechnologyName>,
    public readonly features: List<Feature>,
    public readonly keywords: List<Keyword>,
    public readonly slug: Slug,
    public readonly repositoryUrl?: WebUrl,
    public readonly link?: WebUrl,
    public readonly bannerUrl?: WebUrl,
    public readonly previewImageUrl?: WebUrl,
    ...params: EntityParams
  ) {
    super(...params)
    Object.freeze(this)
  }

  static create({
    name: _name,
    description: _description,
    usedTechnologies: _usedTechnologies,
    features: _features,
    keywords: _keywords,
    slug: _slug,
    repositoryUrl: _repositoryUrl,
    link: _link,
    bannerUrl: _bannerUrl,
    previewImageUrl: _previewImageUrl,
    id: _id,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
  }: ProjectDTO): Either<string, Project> {
    // Verifica para uma nova entidade ----------------------------------------

    const name = ProjectName.create(_name)
    if (isLeft(name)) return left('name: >> ' + name.value)

    const description = ProjectDescription.create(_description)
    if (isLeft(description)) return left('description: >> ' + description.value)

    let usedTechnologies =
      _usedTechnologies !== undefined
        ? List.create(_usedTechnologies, TechnologyName)
        : []
    if (isLeft(usedTechnologies))
      return left('usedTechnologies: >> ' + usedTechnologies.value)

    let features =
      _features !== undefined ? List.create(_features, Feature) : []
    if (isLeft(features)) return left('features: >> ' + features.value)

    let keywords =
      _keywords !== undefined ? List.create(_keywords, Keyword) : []
    if (isLeft(keywords)) return left('keywords: >> ' + keywords.value)

    let slug = Slug.create(
      _slug !== undefined ? _slug : slugify(name as string),
    )
    if (isLeft(slug)) return left('slug: >> ' + slug.value)

    const repositoryUrl =
      _repositoryUrl !== undefined ? WebUrl.create(_repositoryUrl) : undefined
    if (isLeft(repositoryUrl))
      return left('repositoryUrl: >> ' + repositoryUrl.value)

    const link = _link !== undefined ? WebUrl.create(_link) : undefined
    if (isLeft(link)) return left('link: >> ' + link.value)

    const bannerUrl =
      _bannerUrl !== undefined ? WebUrl.create(_bannerUrl) : undefined
    if (isLeft(bannerUrl)) return left('bannerUrl: >> ' + bannerUrl.value)

    const previewImageUrl =
      _previewImageUrl !== undefined
        ? WebUrl.create(_previewImageUrl)
        : undefined
    if (isLeft(previewImageUrl))
      return left('previewImageUrl: >> ' + previewImageUrl.value)

    if (!_id && !_createdAt && !_updatedAt)
      return new Project(
        name,
        description,
        usedTechnologies,
        features,
        keywords,
        slug,
        repositoryUrl,
        link,
        bannerUrl,
        previewImageUrl,
      )

    // Verifica para uma entidade já existente ----------------------------------------

    usedTechnologies = List.create(
      _usedTechnologies as string[],
      TechnologyName,
    )
    if (isLeft(usedTechnologies))
      return left('usedTechnologies: >> ' + usedTechnologies.value)

    features = List.create(_features as string[], Feature)
    if (isLeft(features)) return left('features: >> ' + features.value)

    keywords = List.create(_keywords as string[], Keyword)
    if (isLeft(keywords)) return left('keywords: >> ' + keywords.value)

    slug = Slug.create(_slug as string)
    if (isLeft(slug)) return left('slug: >> ' + slug.value)

    const id = ID.create(_id!)
    if (isLeft(id)) return left('id: >> ' + id.value)

    const createdAt = Moment.create(_createdAt!)
    if (isLeft(createdAt)) return left('createdAt: >> ' + createdAt.value)

    const updatedAt = Moment.create(_updatedAt!)
    if (isLeft(updatedAt)) return left('updatedAt: >> ' + updatedAt.value)

    return new Project(
      name,
      description,
      usedTechnologies,
      features,
      keywords,
      slug,
      repositoryUrl,
      link,
      bannerUrl,
      previewImageUrl,
      id,
      createdAt,
      updatedAt,
    )
  }
}
