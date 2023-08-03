import { randPhrase } from '@ngneat/falso'

import { Left } from '../../../shared/either'
import { Keyword } from './keyword'

test('Deve instanciar um novo keyword', () => {
  const value = 'something'

  const keyword = Keyword.create(value)

  expect(keyword).toBe(value)
})

describe('Erros de incompatibilidade', () => {
  test('Erro por tipo inválido', () => {
    const value = 46416546

    const keyword = Keyword.create(value as any)

    expect(keyword).toBeInstanceOf(Left)
    expect((keyword as Left<string>).value).toBe(
      'O tipo disso aí não tem nada a ver',
    )
  })

  test('Erro por ter mais de uma palavra', () => {
    const value = randPhrase()

    const keyword = Keyword.create(value)

    expect(keyword).toBeInstanceOf(Left)
    expect((keyword as Left<string>).value).toBe('É pra ser UMA palavra fi')
  })

  test('Erro por excesso de caracteres', () => {
    const value = 'a'.repeat(189820)

    const keyword = Keyword.create(value)

    expect(keyword).toBeInstanceOf(Left)
    expect((keyword as Left<string>).value).toBe(
      'Ta exagerado bro, caractere demais',
    )
  })
})
