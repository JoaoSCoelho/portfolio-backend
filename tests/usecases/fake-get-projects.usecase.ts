import { IGetProjectsUC } from '../../src/application/usecases/ports/get-projects.usecase.port'
import { Project } from '../../src/domain/entities/project'
import { Either } from '../../src/shared/either'

export class FakeGetProjectsUC implements IGetProjectsUC {
  execute: () => Promise<Either<string, Project[]>> = jest.fn(async () => {
    return []
  })
}
