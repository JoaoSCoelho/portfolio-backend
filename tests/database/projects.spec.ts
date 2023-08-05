import mongoose from 'mongoose'

import { projectSchema } from '../../src/external/repositories/mongodb/projects/model'

beforeAll(async () => {
  mongoose.model('Project', projectSchema)
})

test('Não pode ter nenhum project no banco com dados obrigatórios setados como undefined', async () => {
  const existsWrong = await mongoose.model('Project').exists({
    $or: [
      { id: undefined },
      { name: undefined },
      { description: undefined },
      { createdAt: undefined },
      { updatedAt: undefined },
      { usedTechnologies: undefined },
      { keywords: undefined },
      { features: undefined },
      { slug: undefined },
    ],
  })

  expect(existsWrong).toBeNull()
})
