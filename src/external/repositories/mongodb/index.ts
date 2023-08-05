import { Schema } from 'mongoose'

export class BaseSchema extends Schema {
  constructor(...[definition, ...props]: any) {
    super(
      {
        id: {
          type: String,
          required: true,
          unique: true,
          immutable: true,
        },
        normalized: String,
        ...definition,
      },
      {
        timestamps: true,
        ...props,
      },
    )
  }
}
