import { Either, left } from '../../shared/either'
import { IAdminMiddleware } from './ports/admin.middleware.port'

export class AdminMiddleware implements IAdminMiddleware {
  execute(authorization: string): Either<string, true> {
    if (authorization !== process.env.ADMIN_AUTHORIZATION)
      return left('Tu não é administrador colega!')

    return true
  }
}
