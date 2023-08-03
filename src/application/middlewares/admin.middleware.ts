import { left } from '../../shared/either'
import { IAdminMiddleware } from './ports/admin.middleware.port'

export class AdminMiddleware implements IAdminMiddleware {
  execute: IAdminMiddleware['execute'] = (authorization) => {
    if (authorization !== process.env.ADMIN_AUTHORIZATION)
      return left('Tu não é administrador colega!')

    return true
  }
}
