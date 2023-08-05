import { model } from 'mongoose'

import { BaseSchema } from '..'

export const projectSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  usedTechnologies: {
    type: Array,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
  keywords: {
    type: Array,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  repositoryUrl: String,
  link: String,
  bannerUrl: String,
  previewImageUrl: String,
})

export const ProjectModel = model('Project', projectSchema)
