import { model } from 'mongoose'

import { BaseSchema } from '..'

export const projectSchema = new BaseSchema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    repositoryUrl: String,
    link: String,
  },
  {
    timestamps: true,
  },
)

export const ProjectModel = model('Project', projectSchema)
