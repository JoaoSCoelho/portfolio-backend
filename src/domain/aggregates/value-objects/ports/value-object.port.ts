import { Either } from '../../../../shared/either'

export abstract class IValueObject {
  static create: (value: any) => Either<string, IValueObject>
}
