import { randCompanyName, randUrl, randWord } from '@ngneat/falso'
import { randomUUID } from 'crypto'

import { Left, isLeft } from '../../shared/either'
import { Technology } from './technology'

describe('Instanciando uma nova Technology', () => {
  describe('Instanciando com sucesso', () => {
    test('Deve instanciar uma nova tecnologia', () => {
      const technologyData = {
        name: randCompanyName(),
      }

      const technology = Technology.create(technologyData)

      expect(technology).toBeInstanceOf(Technology)
      expect(technology).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        name: technologyData.name,
        keywords: [],
        aliases: [],
      })
    })

    test('Deve instanciar uma nova technologia com todas as props', () => {
      const technologyData = {
        name: randCompanyName(),
        keywords: [randWord(), randWord(), randWord()],
        aliases: [randCompanyName(), randCompanyName()],
        logoUrl: randUrl(),
      }

      const technology = Technology.create(technologyData)

      expect(technology).toBeInstanceOf(Technology)
      expect(technology).toEqual({
        id: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        name: technologyData.name,
        keywords: technologyData.keywords,
        aliases: technologyData.aliases,
        logoUrl: technologyData.logoUrl,
      })
    })
  })

  describe('Retornando mensagem de incompatibilidade', () => {
    test('Deve retornar um erro do name', () => {
      const data = {
        name: 'a'.repeat(100),
      }

      const entity = Technology.create(data)

      expect(isLeft(entity)).toBeTruthy()
      expect(
        (entity as Left<string>).value.startsWith('name: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do keywords', () => {
      const data = {
        name: randCompanyName(),
        keywords: (() => {}) as any,
      }

      const entity = Technology.create(data)

      expect(isLeft(entity)).toBeTruthy()
      expect(
        (entity as Left<string>).value.startsWith('keywords: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do aliases', () => {
      const data = {
        name: randCompanyName(),
        aliases: randCompanyName() as any,
      }

      const entity = Technology.create(data)

      expect(isLeft(entity)).toBeTruthy()
      expect(
        (entity as Left<string>).value.startsWith('aliases: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do logoUrl', () => {
      const data = {
        name: randCompanyName(),
        logoUrl: randWord(),
      }

      const entity = Technology.create(data)

      expect(isLeft(entity)).toBeTruthy()
      expect(
        (entity as Left<string>).value.startsWith('logoUrl: >> '),
      ).toBeTruthy()
    })
  })
})

// -------------------------------------------------------------------------

describe('Instanciando uma tecnologia existente', () => {
  describe('Instanciando com sucesso', () => {
    test('Deve instanciar uma tecnologia', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        aliases: [
          randCompanyName(),
          randCompanyName(),
          randCompanyName(),
          randCompanyName(),
        ],
        keywords: [randWord(), randWord()],
      }

      const entity = Technology.create(data)

      expect(entity).toBeInstanceOf(Technology)
      expect(entity).toEqual(data)
    })

    test('Deve instanciar uma tecnologia com todas as props', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        keywords: [randWord()],
        aliases: [randCompanyName()],
        logoUrl: randUrl(),
      }

      const entity = Technology.create(data)

      expect(entity).toBeInstanceOf(Technology)
      expect(entity).toEqual(data)
    })
  })

  describe('Retornando mensagem de incompatibilidade', () => {
    test('Deve retornar um erro do keywords', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        aliases: [randCompanyName(), randCompanyName()],
      }

      const entity = Technology.create(data)

      expect(isLeft(entity)).toBeTruthy()
      expect(
        (entity as Left<string>).value.startsWith('keywords: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do aliases', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        keywords: [randWord(), randWord()],
      }

      const entity = Technology.create(data)

      expect(isLeft(entity)).toBeTruthy()
      expect(
        (entity as Left<string>).value.startsWith('aliases: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do id', () => {
      const data = {
        createdAt: new Date(),
        updatedAt: new Date(),
        name: randCompanyName(),
        keywords: [randWord(), randWord(), randWord()],
        aliases: [randCompanyName(), randCompanyName()],
      }

      const entity = Technology.create(data)

      expect(isLeft(entity)).toBeTruthy()
      expect((entity as Left<string>).value.startsWith('id: >> ')).toBeTruthy()
    })

    test('Deve retornar um erro do createdAt', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date('asdas654'),
        updatedAt: new Date(),
        name: randCompanyName(),
        keywords: [randWord(), randWord(), randWord()],
        aliases: [randCompanyName(), randCompanyName()],
      }

      const entity = Technology.create(data)

      expect(isLeft(entity)).toBeTruthy()
      expect(
        (entity as Left<string>).value.startsWith('createdAt: >> '),
      ).toBeTruthy()
    })

    test('Deve retornar um erro do updatedAt', () => {
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: 'new Date()' as any,
        name: randCompanyName(),
        keywords: [randWord(), randWord(), randWord()],
        aliases: [randCompanyName(), randCompanyName()],
      }

      const entity = Technology.create(data)

      expect(isLeft(entity)).toBeTruthy()
      expect(
        (entity as Left<string>).value.startsWith('updatedAt: >> '),
      ).toBeTruthy()
    })
  })
})
