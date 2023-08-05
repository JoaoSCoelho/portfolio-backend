import mongoose from 'mongoose'

import { technologySchema } from '../../src/external/repositories/mongodb/technologies/model'

beforeAll(async () => {
  mongoose.model('Technology', technologySchema)
})

test('Não pode ter nenhum technology no banco com dados obrigatórios setados como undefined', async () => {
  const existsWrong = await mongoose.model('Technology').exists({
    $or: [
      { id: undefined },
      { createdAt: undefined },
      { updatedAt: undefined },
      { name: undefined },
      { aliases: undefined },
      { keywords: undefined },
    ],
  })

  expect(existsWrong).toBeNull()
})
