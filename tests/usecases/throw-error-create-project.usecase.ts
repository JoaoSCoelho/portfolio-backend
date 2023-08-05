import { ICreateProjectUC } from '../../src/application/usecases/ports/create-project.usecase.port'

export class ThrowErrorCreateProjectUC implements ICreateProjectUC {
  execute: ICreateProjectUC['execute'] = jest.fn(async () => {
    throw new Error()
  })
}
