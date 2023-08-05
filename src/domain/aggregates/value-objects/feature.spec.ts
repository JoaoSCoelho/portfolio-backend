import { Left } from '../../../shared/either'
import { Feature } from './feature'

test('Deve instanciar um novo feature', () => {
  const value = 'something else'

  const feature = Feature.create(value)

  expect(feature).toBe(value)
})

describe('Erros de incompatibilidade', () => {
  test('Erro por tipo inválido', () => {
    const value = 46416546

    const feature = Feature.create(value as any)

    expect(feature).toBeInstanceOf(Left)
    expect((feature as Left<string>).value).toBe(
      'O tipo disso aí não tem nada a ver',
    )
  })

  test('Erro por excesso de caracteres', () => {
    const value = 'a'.repeat(999999)

    const feature = Feature.create(value)

    expect(feature).toBeInstanceOf(Left)
    expect((feature as Left<string>).value).toBe(
      'Ta exagerado bro, caractere demais',
    )
  })
})
