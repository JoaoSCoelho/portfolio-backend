import { model } from 'mongoose'

import { BaseSchema } from '..'

export const technologySchema = new BaseSchema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  keywords: {
    type: Array<string>,
    required: true,
  },
  aliases: {
    type: Array<string>,
    required: true,
  },
  logoUrl: {
    type: String,
  },
})

export const TechnologyModel = model('Technology', technologySchema)
