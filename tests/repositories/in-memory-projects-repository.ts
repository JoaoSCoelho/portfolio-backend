import { Project } from '../../src/domain/entities/project'
import { IProjectsRepository } from '../../src/external/repositories/ports/projects-repository.port'
import { isLeft, left } from '../../src/shared/either'

export class InMemoryProjectsRepository implements IProjectsRepository {
  db: Project[]

  constructor() {
    this.db = []
  }

  all = async () => {
    return this.db
  }

  create: IProjectsRepository['create'] = async (project) => {
    this.db.push(project)
  }

  existsWithThisSlug: IProjectsRepository['existsWithThisSlug'] = async (
    slug,
  ) => {
    return !!this.db.find((p) => p.slug === slug)
  }

  update: IProjectsRepository['update'] = async (id, obj, propsToRemove) => {
    const projectToUpdate = this.db.find((project) => project.id === id)
    const projectToUpdateIndex = this.db.findIndex(
      (project) => project.id === id,
    )

    if (!projectToUpdate) return left('Não existe project com esse id')

    let updatedProject = Project.create({
      name: (obj.name === undefined ? projectToUpdate.name : obj.name) as any,
      description: (obj.description === undefined
        ? projectToUpdate.description
        : obj.description) as any,
      bannerUrl: (obj.bannerUrl === undefined
        ? projectToUpdate.bannerUrl
        : obj.bannerUrl) as any,
      createdAt: (obj.createdAt === undefined
        ? projectToUpdate.createdAt
        : obj.createdAt) as any,
      updatedAt: (obj.updatedAt === undefined
        ? projectToUpdate.updatedAt
        : obj.updatedAt) as any,
      features: (obj.features === undefined
        ? projectToUpdate.features
        : obj.features) as any,
      id: (obj.id === undefined ? projectToUpdate.id : obj.id) as any,
      keywords: (obj.keywords === undefined
        ? projectToUpdate.keywords
        : obj.keywords) as any,
      link: (obj.link === undefined ? projectToUpdate.link : obj.link) as any,
      previewImageUrl: (obj.previewImageUrl === undefined
        ? projectToUpdate.previewImageUrl
        : obj.previewImageUrl) as any,
      repositoryUrl: (obj.repositoryUrl === undefined
        ? projectToUpdate.repositoryUrl
        : obj.repositoryUrl) as any,
      slug: (obj.slug === undefined ? projectToUpdate.slug : obj.slug) as any,
      usedTechnologies: (obj.usedTechnologies === undefined
        ? projectToUpdate.usedTechnologies
        : obj.usedTechnologies) as any,
    })

    updatedProject = Project.create({
      ...(updatedProject as any),
      ...propsToRemove?.reduce(
        (prev, curr) => ({ ...prev, [curr]: undefined }),
        {},
      ),
    })

    if (isLeft(updatedProject)) throw new Error()

    this.db[projectToUpdateIndex] = updatedProject

    return updatedProject
  }

  removeProps: IProjectsRepository['removeProps'] = async (id, props) => {
    const projectToUpdate = this.db.find((project) => project.id === id)
    const projectToUpdateIndex = this.db.findIndex(
      (project) => project.id === id,
    )

    const updatedProject = Project.create({
      ...(projectToUpdate as any),
      ...props?.reduce((prev, curr) => ({ ...prev, [curr]: undefined }), {}),
    })

    if (isLeft(updatedProject)) throw new Error()

    this.db[projectToUpdateIndex] = updatedProject

    return updatedProject
  }
}
