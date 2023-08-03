import { randCompanyName, randParagraph, randUrl } from '@ngneat/falso'
import { randomUUID } from 'crypto'
import mongoose from 'mongoose'
import supertest from 'supertest'

import { app } from '../../../src/main/express/app'
import toJson from '../../../src/shared/toJson'

describe('(POST) /api/projects', () => {
  describe('Sucesso', () => {
    test('Deve criar um novo project (props obrigatórias)', async () => {
      const projectData = {
        name: randCompanyName(),
        description: randParagraph(),
      }

      const { body } = await supertest(app)
        .post('/api/projects')
        .set({ Authorization: process.env.ADMIN_AUTHORIZATION })
        .send(projectData)
        .expect(201)

      const dbProjects = await mongoose
        .model('Project')
        .find({ id: body?.project?.id })

      expect(body).toEqual({
        project: {
          ...projectData,
          id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      })
      expect(dbProjects.length).toBe(1)
      expect(toJson(dbProjects[0])).toMatchObject(body.project)
    })

    test('Deve criar um novo project (todas as props)', async () => {
      const projectData = {
        name: randCompanyName(),
        description: randParagraph(),
        repositoryUrl: randUrl(),
        link: randUrl(),
      }

      const { body } = await supertest(app)
        .post('/api/projects')
        .set({ Authorization: process.env.ADMIN_AUTHORIZATION })
        .send(projectData)
        .expect(201)

      const dbProjects = await mongoose
        .model('Project')
        .find({ id: body?.project?.id })

      expect(body).toEqual({
        project: {
          ...projectData,
          id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      })
      expect(dbProjects.length).toBe(1)
      expect(toJson(dbProjects[0])).toMatchObject(body.project)
    })
  })

  describe('Falha', () => {
    test('Não ser admin', async () => {
      const projectData = {
        // O UUID é pra garantir unique e conseguir buscar no banco
        name: randCompanyName() + randomUUID(),
        description: randParagraph(),
        repositoryUrl: randUrl(),
        link: randUrl(),
      }

      const { body } = await supertest(app)
        .post('/api/projects')
        .send(projectData)
        .expect(401)

      const dbProjects = await mongoose
        .model('Project')
        .find({ name: projectData.name })

      expect(body).toEqual({
        message: 'Tu não é administrador colega!',
      })
      expect(dbProjects.length).toBe(0)
    })
  })

  test('Não passar uma prop', async () => {
    const projectData = {
      // O UUID é pra garantir unique e conseguir buscar no banco
      description: randParagraph() + randomUUID(),
      repositoryUrl: randUrl(),
      link: randUrl(),
    }

    const { body } = await supertest(app)
      .post('/api/projects')
      .set({ Authorization: process.env.ADMIN_AUTHORIZATION })
      .send(projectData)
      .expect(400)

    const dbProjects = await mongoose
      .model('Project')
      .find({ description: projectData.description })

    expect(body).toEqual({
      message:
        'Deu merda aqui instanciando o project: >> name: >> O tipo disso aí não tem nada a ver',
    })
    expect(dbProjects.length).toBe(0)
  })

  test('enviando link inválido', async () => {
    const projectData = {
      // O UUID é pra garantir unique e conseguir buscar no banco
      name: randCompanyName() + randomUUID(),
      description: randParagraph(),
      repositoryUrl: randUrl(),
      link: 'something-no-url',
    }

    const { body } = await supertest(app)
      .post('/api/projects')
      .set({ Authorization: process.env.ADMIN_AUTHORIZATION })
      .send(projectData)
      .expect(400)

    const dbProjects = await mongoose
      .model('Project')
      .find({ name: projectData.name })

    expect(body).toEqual({
      message:
        'Deu merda aqui instanciando o project: >> link: >> Isso não é uma url nem aqui nem na *****',
    })
    expect(dbProjects.length).toBe(0)
  })
})
