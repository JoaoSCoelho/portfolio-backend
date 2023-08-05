import { Left } from '../../../shared/either'
import { TechnologyName } from './technology-name'

test('Deve instanciar um novo technology-name', () => {
  const name = 'something else'

  const technologyName = TechnologyName.create(name)

  expect(technologyName).toBe(name)
})

describe('Erros de incompatibilidade', () => {
  test('Erro por tipo inválido', () => {
    const name = 46416546

    const technologyName = TechnologyName.create(name as any)

    expect(technologyName).toBeInstanceOf(Left)
    expect((technologyName as Left<string>).value).toBe(
      'O tipo disso aí não tem nada a ver',
    )
  })

  test('Erro por excesso de caracteres', () => {
    const name = 'a'.repeat(100)

    const technologyName = TechnologyName.create(name)

    expect(technologyName).toBeInstanceOf(Left)
    expect((technologyName as Left<string>).value).toBe(
      'Ta exagerado bro, caractere demais',
    )
  })
})
