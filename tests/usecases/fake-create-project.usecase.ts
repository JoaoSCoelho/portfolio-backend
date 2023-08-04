import { ICreateProjectUC } from '../../src/application/usecases/ports/create-project.usecase.port'
import { Project } from '../../src/domain/entities/project'

export class FakeCreateProjectUC implements ICreateProjectUC {
  execute: ICreateProjectUC['execute'] = jest.fn(async (data) => {
    return Project.create(data)
  })
}
