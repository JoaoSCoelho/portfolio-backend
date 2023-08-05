import { IGetProjectsUC } from '../../src/application/usecases/ports/get-projects.usecase.port'

export class ThrowErrorGetProjectsUC implements IGetProjectsUC {
  execute: IGetProjectsUC['execute'] = jest.fn(async () => {
    throw new Error()
  })
}
