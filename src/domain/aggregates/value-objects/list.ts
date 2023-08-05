import {
  Either,
  Left,
  everyIsRight,
  isLeft,
  left,
} from '../../../shared/either'
import { IValueObject } from './ports/value-object.port'

export class List<Item extends IValueObject = any>
  extends Array<Item>
  implements IValueObject
{
  static create<Item extends IValueObject = any>(
    value: Item[],
    valueObject: typeof IValueObject,
  ): Either<string, List<Item>> {
    if (!Array.isArray(value)) return left('O tipo disso aí não tem nada a ver')

    const list = value.map((v) => valueObject.create(v))

    if (!everyIsRight(list)) {
      const [firstWithError, firstWithErrorIndex] = [
        (list as Either<string, IValueObject>[]).find((v) =>
          isLeft(v),
        )! as Left<string>,
        (list as Either<string, IValueObject>[]).findIndex((v) => isLeft(v))!,
      ]

      return left(
        `Ihh, o item de indíce ${firstWithErrorIndex} ta de intruso: >> ${firstWithError.value}`,
      )
    }

    return list as List<Item>
  }
}
