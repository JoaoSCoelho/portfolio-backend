import { randCompanyName, randParagraph, randUrl } from '@ngneat/falso'
import { randomUUID } from 'crypto'

import { Left, isLeft } from '../../shared/either'
import { Project } from './project'

describe('Instanciando um novo Project', () => {
  describe('Instanciando com sucesso', () => {
    test('Deve instanciar um novo Project', () => {
      const projectData = {
        name: randCompanyName(),
        description: randParagraph(),
      }

      const project = Project.create(projectData.name, projectData.description)

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        name: projectData.name,
        description: projectData.description,
      })
    })

    test('Deve instanciar um novo Project com link', () => {
      const projectData = {
        name: randCompanyName(),
        description: randParagraph(),
        link: randUrl(),
      }

      const project = Project.create(
        projectData.name,
        projectData.description,
        undefined,
        projectData.link,
      )

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        name: projectData.name,
        description: projectData.description,
        link: projectData.link,
      })
    })

    test('Deve instanciar um novo Project com repositoryUrl', () => {
      const projectData = {
        name: randCompanyName(),
        description: randParagraph(),
        repositoryUrl: randUrl(),
      }

      const project = Project.create(
        projectData.name,
        projectData.description,
        projectData.repositoryUrl,
      )

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        name: projectData.name,
        description: projectData.description,
        repositoryUrl: projectData.repositoryUrl,
      })
    })

    test('Deve instanciar um novo Project com repositoryUrl e link', () => {
      const projectData = {
        name: randCompanyName(),
        description: randParagraph(),
        repositoryUrl: randUrl(),
        link: randUrl(),
      }

      const project = Project.create(
        projectData.name,
        projectData.description,
        projectData.repositoryUrl,
        projectData.link,
      )

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        name: projectData.name,
        description: projectData.description,
        repositoryUrl: projectData.repositoryUrl,
        link: projectData.link,
      })
    })
  })

  describe('Retornando mensagem de incompatibilidade', () => {
    test('Deve retornar um erro do name', () => {
      const projectData = {
        name: 546543,
        description: randParagraph(),
      }

      const project = Project.create(
        projectData.name as any,
        projectData.description,
      )

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('name: →→ '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do description', () => {
      const projectData = {
        name: randCompanyName(),
        description: 54654132,
      }

      const project = Project.create(
        projectData.name,
        projectData.description as any,
      )

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('description: →→ '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do repositoryUrl', () => {
      const projectData = {
        name: randCompanyName(),
        description: randParagraph(),
        repositoryUrl: 'no-formatted-url',
      }

      const project = Project.create(
        projectData.name,
        projectData.description,
        projectData.repositoryUrl,
      )

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('repositoryUrl: →→ '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do link', () => {
      const projectData = {
        name: randCompanyName(),
        description: randParagraph(),
        link: 'no-formatted-url',
      }

      const project = Project.create(
        projectData.name,
        projectData.description,
        undefined,
        projectData.link,
      )

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('link: →→ '),
      ).toBeTruthy()
    })
  })
})

// -------------------------------------------------------------------------

describe('Instanciando um Project existente', () => {
  describe('Instanciando com sucesso', () => {
    test('Deve instanciar um project', () => {
      const projectData = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
      }

      const project = Project.create(
        projectData.name,
        projectData.description,
        undefined,
        undefined,
        projectData.id,
        projectData.createdAt,
        projectData.updatedAt,
      )

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual(projectData)
    })

    test('Deve instanciar um project com repositoryUrl', () => {
      const projectData = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        repositoryUrl: randUrl(),
      }

      const project = Project.create(
        projectData.name,
        projectData.description,
        projectData.repositoryUrl,
        undefined,
        projectData.id,
        projectData.createdAt,
        projectData.updatedAt,
      )

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual(projectData)
    })

    test('Deve instanciar um project com link', () => {
      const projectData = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        link: randUrl(),
      }

      const project = Project.create(
        projectData.name,
        projectData.description,
        undefined,
        projectData.link,
        projectData.id,
        projectData.createdAt,
        projectData.updatedAt,
      )

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual(projectData)
    })

    test('Deve instanciar um project com repositoryUrl e link', () => {
      const projectData = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        repositoryUrl: randUrl(),
        link: randUrl(),
      }

      const project = Project.create(
        projectData.name,
        projectData.description,
        projectData.repositoryUrl,
        projectData.link,
        projectData.id,
        projectData.createdAt,
        projectData.updatedAt,
      )

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual(projectData)
    })
  })

  describe('Retornando mensagem de incompatibilidade', () => {
    test('Deve retornar um erro do id', () => {
      const projectData = {
        id: 45454654654,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
      }

      const project = Project.create(
        projectData.name,
        projectData.description,
        undefined,
        undefined,
        projectData.id as any,
        projectData.createdAt,
        projectData.updatedAt,
      )

      expect(isLeft(project)).toBeTruthy()
      expect((project as Left<string>).value.startsWith('id: →→ ')).toBeTruthy()
    })

    test('Deve retornar um erro do createdAt', () => {
      const projectData = {
        id: randomUUID(),
        createdAt: 'new Date()',
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
      }

      const project = Project.create(
        projectData.name,
        projectData.description,
        undefined,
        undefined,
        projectData.id,
        projectData.createdAt as any,
        projectData.updatedAt,
      )

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('createdAt: →→ '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do updatedAt', () => {
      const projectData = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: 'new Date()',
        name: randCompanyName(),
        description: randParagraph(),
      }

      const project = Project.create(
        projectData.name,
        projectData.description,
        undefined,
        undefined,
        projectData.id,
        projectData.createdAt,
        projectData.updatedAt as any,
      )

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('updatedAt: →→ '),
      ).toBeTruthy()
    })
  })
})
