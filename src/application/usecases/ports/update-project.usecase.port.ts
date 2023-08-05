import { Project, ProjectDTO } from '../../../domain/entities/project'
import { Either } from '../../../shared/either'

export abstract class IUpdateProjectUC {
  abstract execute(
    id: string,
    data: Partial<
      Omit<
        ProjectDTO,
        'previewImageUrl' | 'bannerUrl' | 'repositoryUrl' | 'link'
      >
    > & {
      previewImageUrl?: ProjectDTO['previewImageUrl'] | null
      bannerUrl?: ProjectDTO['bannerUrl'] | null
      repositoryUrl?: ProjectDTO['repositoryUrl'] | null
      link?: ProjectDTO['link'] | null
    },
  ): Promise<Either<string, Project>>
}
