import { Entity } from './entity'

test('Deve instanciar uma nova entidade', () => {
  class EntityChild extends Entity {
    constructor() {
      super()
    }
  }

  const entity = new EntityChild()

  expect(entity).toBeInstanceOf(Entity)
  expect(entity).toEqual({
    id: expect.any(String),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  })
})

describe('Erros', () => {
  test('Deve retornar um erro se tentar instanciar apenas com o id', () => {
    class EntityChild extends Entity {
      constructor() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        super('someid')
      }
    }

    expect(() => new EntityChild()).toThrow(Error)
  })

  test('Deve retornar um erro se tentar instanciar apenas com o createdAt', () => {
    class EntityChild extends Entity {
      constructor() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        super(undefined, new Date())
      }
    }

    expect(() => new EntityChild()).toThrow(Error)
  })

  test('Deve retornar um erro se tentar instanciar apenas com o updatedAt', () => {
    class EntityChild extends Entity {
      constructor() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        super(undefined, undefined, new Date())
      }
    }

    expect(() => new EntityChild()).toThrow(Error)
  })
})
