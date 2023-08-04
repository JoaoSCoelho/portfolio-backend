import { Project } from '../../../domain/entities/project'
import { Either } from '../../../shared/either'

export abstract class ICreateProjectUC {
  abstract execute(data: {
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
  }): Promise<Either<string, Project>>
}
