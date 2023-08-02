import { Either } from '../../../shared/either'

export abstract class IAdminMiddleware {
  abstract execute(authorization: string): Either<string, true>
}
