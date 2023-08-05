import { randSlug } from '@ngneat/falso'

import { Left } from '../../../shared/either'
import { Slug } from './slug'

test('Deve instanciar um novo slug', () => {
  const value = randSlug()

  const slug = Slug.create(value)

  expect(slug).toBe(value)
})

describe('Deve retornar erros de incommpatibilidade', () => {
  test('Erro por tipo inválido', () => {
    const value = 654365324

    const slug = Slug.create(value as any)

    expect(slug).toBeInstanceOf(Left)
    expect((slug as Left<string>).value).toBe(
      'O tipo disso aí não tem nada a ver',
    )
  })

  test('Erro por estrutura inválida (espaço)', () => {
    const value = 'asdasasfa comasdasd'

    const slug = Slug.create(value)

    expect(slug).toBeInstanceOf(Left)
    expect((slug as Left<string>).value).toBe('Isso daí não é um slug')
  })

  test('Erro por estrutura inválida (ponto)', () => {
    const value = 'asdasasfa.comasdasd'

    const slug = Slug.create(value)

    expect(slug).toBeInstanceOf(Left)
    expect((slug as Left<string>).value).toBe('Isso daí não é um slug')
  })

  test('Erro por estrutura inválida (maiúscula)', () => {
    const value = 'asdasasfaComasdasd'

    const slug = Slug.create(value)

    expect(slug).toBeInstanceOf(Left)
    expect((slug as Left<string>).value).toBe('Isso daí não é um slug')
  })

  test('Erro por estrutura inválida (termina com hífen)', () => {
    const value = 'asdasasfacomasdasd-'

    const slug = Slug.create(value)

    expect(slug).toBeInstanceOf(Left)
    expect((slug as Left<string>).value).toBe('Isso daí não é um slug')
  })

  test('Erro por estrutura inválida (caractere especial)', () => {
    const value = 'asdasasfacoma#sdasd'

    const slug = Slug.create(value)

    expect(slug).toBeInstanceOf(Left)
    expect((slug as Left<string>).value).toBe('Isso daí não é um slug')
  })
})
