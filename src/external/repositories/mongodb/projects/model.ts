import { model } from 'mongoose'

import { BaseSchema } from '..'

export const projectSchema = new BaseSchema(
  {
    description: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    spent: {
      type: Number,
      required: true,
    },
    bankAccountId: {
      type: String,
      required: true,
    },
    createdTimestamp: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const ProjectModel = model('Project', projectSchema)
