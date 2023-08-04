import { randomUUID } from 'crypto'

import { ID } from '../../domain/aggregates/value-objects/id'
import { Moment } from '../../domain/aggregates/value-objects/moment'
import { isLeft } from '../../shared/either'

export type EntityDTO = { id?: string; createdAt?: Date; updatedAt?: Date }
export type EntityParams = [id: ID, createdAt: Moment, updatedAt: Moment] | []

export class Entity {
  public readonly id: ID
  public readonly createdAt: Moment
  public readonly updatedAt: Moment

  protected constructor(...[id, createdAt, updatedAt]: EntityParams) {
    if (id || createdAt || updatedAt) {
      if (!(id && createdAt && updatedAt)) throw new Error()

      this.id = id
      this.createdAt = createdAt
      this.updatedAt = updatedAt
    } else {
      const currentMoment = Moment.create(new Date())
      const _id = ID.create(randomUUID())

      if (isLeft(_id) || isLeft(currentMoment)) throw new Error()

      this.id = _id
      this.createdAt = currentMoment
      this.updatedAt = currentMoment
    }
  }
}
