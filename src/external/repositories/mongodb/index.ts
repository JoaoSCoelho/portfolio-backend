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
        ...definition,
      },
      {
        timestamps: true,
        ...props,
      },
    )
  }
}
