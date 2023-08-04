import {
  randCompanyName,
  randParagraph,
  randPhrase,
  randSlug,
  randUrl,
  randWord,
} from '@ngneat/falso'
import { randomUUID } from 'crypto'

import { Left, isLeft } from '../../shared/either'
import { slugify } from '../../shared/slugify'
import { Project } from './project'

describe('Instanciando um novo Project', () => {
  describe('Instanciando com sucesso', () => {
    test('Deve instanciar um novo Project', () => {
      const data = {
        name: randCompanyName(),
        description: randParagraph(),
      }

      const project = Project.create(data)

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        keywords: [],
        features: [],
        usedTechnologies: [],
        slug: slugify(data.name),
        name: data.name,
        description: data.description,
      })
    })

    test('Deve instanciar um novo Project com repositoryUrl', () => {
      const data = {
        name: randCompanyName(),
        description: randParagraph(),
        repositoryUrl: randUrl(),
      }

      const project = Project.create(data)

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        name: data.name,
        description: data.description,
        repositoryUrl: data.repositoryUrl,
        keywords: [],
        features: [],
        usedTechnologies: [],
        slug: slugify(data.name),
      })
    })

    test('Deve instanciar um novo Project com link', () => {
      const data = {
        name: randCompanyName(),
        description: randParagraph(),
        link: randUrl(),
      }

      const project = Project.create(data)

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        name: data.name,
        description: data.description,
        link: data.link,
        keywords: [],
        features: [],
        usedTechnologies: [],
        slug: slugify(data.name),
      })
    })

    test('Deve instanciar um novo Project com repositoryUrl e link', () => {
      const data = {
        name: randCompanyName(),
        description: randParagraph(),
        repositoryUrl: randUrl(),
        link: randUrl(),
      }

      const project = Project.create(data)

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        name: data.name,
        description: data.description,
        repositoryUrl: data.repositoryUrl,
        link: data.link,
        keywords: [],
        features: [],
        usedTechnologies: [],
        slug: slugify(data.name),
      })
    })

    test('Deve instanciar um novo Project com todas as props', () => {
      const data = {
        name: randCompanyName(),
        description: randParagraph(),
        repositoryUrl: randUrl(),
        link: randUrl(),
        usedTechnologies: [
          randCompanyName(),
          randCompanyName(),
          randCompanyName(),
        ],
        features: [randPhrase(), randPhrase(), randPhrase()],
        slug: randSlug(),
        keywords: [randWord(), randWord(), randWord()],
        bannerUrl: randUrl(),
        previewImageUrl: randUrl(),
      }

      const project = Project.create(data)

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        ...data,
      })
    })
  })

  describe('Retornando mensagem de incompatibilidade', () => {
    test('Deve retornar um erro do name', () => {
      const projectData = {
        name: 546543 as any,
        description: randParagraph(),
      }

      const project = Project.create(projectData)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('name: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do description', () => {
      const projectData = {
        name: randCompanyName(),
        description: 54654132 as any,
      }

      const project = Project.create(projectData)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('description: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do usedTechnologies', () => {
      const data = {
        name: randCompanyName(),
        description: randParagraph(),
        usedTechnologies: (() => randWord()) as any,
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('usedTechnologies: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do features', () => {
      const data = {
        name: randCompanyName(),
        description: randParagraph(),
        features: false as any,
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('features: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do keywords', () => {
      const data = {
        name: randCompanyName(),
        description: randParagraph(),
        keywords: randWord() as any,
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('keywords: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do slug', () => {
      const data = {
        name: randCompanyName(),
        description: randParagraph(),
        slug: { slug: randSlug() } as any,
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('slug: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do repositoryUrl', () => {
      const data = {
        name: randCompanyName(),
        description: randParagraph(),
        repositoryUrl: 'no-formatted-url',
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('repositoryUrl: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do link', () => {
      const data = {
        name: randCompanyName(),
        description: randParagraph(),
        link: 'no-formatted-url',
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('link: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do bannerUrl', () => {
      const data = {
        name: randCompanyName(),
        description: randParagraph(),
        bannerUrl: 465 as any,
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('bannerUrl: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do previewImageUrl', () => {
      const data = {
        name: randCompanyName(),
        description: randParagraph(),
        previewImageUrl: true as any,
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('previewImageUrl: >> '),
      ).toBeTruthy()
    })
  })
})

// -------------------------------------------------------------------------

describe('Instanciando um Project existente', () => {
  describe('Instanciando com sucesso', () => {
    test('Deve instanciar um project', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        usedTechnologies: [randCompanyName(), randCompanyName()],
        features: [randPhrase(), randPhrase()],
        keywords: [randWord(), randWord(), randWord()],
        slug: randSlug(),
      }

      const project = Project.create(data)

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual(data)
    })

    test('Deve instanciar um project com repositoryUrl', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        repositoryUrl: randUrl(),
        usedTechnologies: [randCompanyName(), randCompanyName()],
        features: [randPhrase(), randPhrase()],
        keywords: [randWord(), randWord(), randWord()],
        slug: randSlug(),
      }

      const project = Project.create(data)

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual(data)
    })

    test('Deve instanciar um project com link', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        link: randUrl(),
        usedTechnologies: [randCompanyName(), randCompanyName()],
        features: [randPhrase(), randPhrase()],
        keywords: [randWord(), randWord(), randWord()],
        slug: randSlug(),
      }

      const project = Project.create(data)

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual(data)
    })

    test('Deve instanciar um project com repositoryUrl e link', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        repositoryUrl: randUrl(),
        link: randUrl(),
        usedTechnologies: [randCompanyName(), randCompanyName()],
        features: [randPhrase(), randPhrase()],
        keywords: [randWord(), randWord(), randWord()],
        slug: randSlug(),
      }

      const project = Project.create(data)

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual(data)
    })

    test('Deve instanciar um project com todas as props', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        repositoryUrl: randUrl(),
        link: randUrl(),
        usedTechnologies: [randCompanyName(), randCompanyName()],
        features: [randPhrase(), randPhrase()],
        keywords: [randWord(), randWord(), randWord()],
        slug: randSlug(),
        bannerUrl: randUrl(),
        previewImageUrl: randUrl(),
      }

      const project = Project.create(data)

      expect(project).toBeInstanceOf(Project)
      expect(project).toEqual(data)
    })
  })

  describe('Retornando mensagem de incompatibilidade', () => {
    test('Deve retornar um erro do usedTechnologies', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        features: [randPhrase(), randPhrase()],
        keywords: [randWord(), randWord(), randWord()],
        slug: randSlug(),
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('usedTechnologies: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do features', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        usedTechnologies: [randCompanyName(), randCompanyName()],
        keywords: [randWord(), randWord(), randWord()],
        slug: randSlug(),
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('features: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do keywords', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        usedTechnologies: [randCompanyName(), randCompanyName()],
        features: [randPhrase(), randPhrase()],
        slug: randSlug(),
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('keywords: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do slug', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        usedTechnologies: [randCompanyName(), randCompanyName()],
        features: [randPhrase(), randPhrase()],
        keywords: [randWord(), randWord(), randWord()],
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('slug: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do id', () => {
      const data = {
        id: 45454654654 as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        usedTechnologies: [randCompanyName(), randCompanyName()],
        features: [randPhrase(), randPhrase()],
        keywords: [randWord(), randWord(), randWord()],
        slug: randSlug(),
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect((project as Left<string>).value.startsWith('id: >> ')).toBeTruthy()
    })

    test('Deve retornar um erro do createdAt', () => {
      const data = {
        id: randomUUID(),
        createdAt: 'new Date()' as any,
        updatedAt: new Date(),
        name: randCompanyName(),
        description: randParagraph(),
        usedTechnologies: [randCompanyName(), randCompanyName()],
        features: [randPhrase(), randPhrase()],
        keywords: [randWord(), randWord(), randWord()],
        slug: randSlug(),
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('createdAt: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do updatedAt', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: 'new Date()' as any,
        name: randCompanyName(),
        description: randParagraph(),
        usedTechnologies: [randCompanyName(), randCompanyName()],
        features: [randPhrase(), randPhrase()],
        keywords: [randWord(), randWord(), randWord()],
        slug: randSlug(),
      }

      const project = Project.create(data)

      expect(isLeft(project)).toBeTruthy()
      expect(
        (project as Left<string>).value.startsWith('updatedAt: >> '),
      ).toBeTruthy()
    })
  })
})
