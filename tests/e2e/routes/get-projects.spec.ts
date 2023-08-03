import { randCompanyName, randParagraph, randUrl } from '@ngneat/falso'
import { randomUUID } from 'crypto'
import mongoose from 'mongoose'
import supertest from 'supertest'

import { app } from '../../../src/main/express/app'

const predefinedProjects = [
  ...'.'
    .repeat(2)
    .split('')
    .map(() => ({
      name: randCompanyName(),
      description: randParagraph(),
      id: randomUUID(),
      createdAt: new Date().toJSON(),
      updatedAt: new Date().toJSON(),
    })),
  ...'.'
    .repeat(3)
    .split('')
    .map(() => ({
      name: randCompanyName(),
      description: randParagraph(),
      repositoryUrl: randUrl(),
      id: randomUUID(),
      createdAt: new Date().toJSON(),
      updatedAt: new Date().toJSON(),
    })),
  ...'.'
    .repeat(3)
    .split('')
    .map(() => ({
      name: randCompanyName(),
      description: randParagraph(),
      link: randUrl(),
      id: randomUUID(),
      createdAt: new Date().toJSON(),
      updatedAt: new Date().toJSON(),
    })),
  ...'.'
    .repeat(2)
    .split('')
    .map(() => ({
      name: randCompanyName(),
      description: randParagraph(),
      repositoryUrl: randUrl(),
      link: randUrl(),
      id: randomUUID(),
      createdAt: new Date().toJSON(),
      updatedAt: new Date().toJSON(),
    })),
]

beforeAll(async () => {
  await mongoose.model('Project').create(...predefinedProjects)
})

describe('(GET) /api/projects', () => {
  test('Deve retornar todos os projects do banco', async () => {
    const response = await supertest(app).get('/api/projects').expect(200)

    expect(response.body).toEqual({
      projects: expect.arrayContaining(predefinedProjects),
    })
  })
})
