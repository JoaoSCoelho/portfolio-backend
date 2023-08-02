import { IAdminMiddleware } from '../../src/application/middlewares/ports/admin.middleware.port'
import { left } from '../../src/shared/either'

export class FakeAdminMiddleware implements IAdminMiddleware {
  constructor(private readonly adminAuthorization: string) {}

  execute: IAdminMiddleware['execute'] = jest.fn((authorization) => {
    if (authorization !== this.adminAuthorization)
      return left('Tu não é administrador colega!')

    return true
  })
}
