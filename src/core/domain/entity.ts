import { everyIsRight } from '../../shared/either'
import { IdSupplier } from './global/suppliers/id'

export class Entity {
  public readonly id: ID
  public readonly createdAt: Moment
  public readonly updatedAt: Moment

  constructor(id?: ID, createdAt?: Moment, updatedAt?: Moment) {
    const currentMoment = Moment.create(new Date())

    this.id = id ?? ID.create(IdSupplier.gen())
    this.createdAt = createdAt ?? currentMoment
    this.updatedAt = updatedAt ?? currentMoment

    if (!everyIsRight([this.id, this.createdAt, this.updatedAt]))
      throw new Error()
  }
}
