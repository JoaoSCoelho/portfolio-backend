import { randUrl } from '@ngneat/falso'

import { Left } from '../../../shared/either'
import { WebUrl } from './web-url'

test('Deve instanciar um novo WebUrl', () => {
  const url = randUrl()

  const webUrl = WebUrl.create(url)

  expect(webUrl).toBe(url)
})

describe('Deve retornar erros de incommpatibilidade', () => {
  test('Erro por tipo inválido', () => {
    const url = 654365324

    const webUrl = WebUrl.create(url as any)

    expect(webUrl).toBeInstanceOf(Left)
    expect((webUrl as Left<string>).value).toBe('Tipo inválido')
  })

  test('Erro por excesso de caracteres', () => {
    const url = 'a'.repeat(999999)

    const webUrl = WebUrl.create(url)

    expect(webUrl).toBeInstanceOf(Left)
    expect((webUrl as Left<string>).value).toBe('Muito longo')
  })

  test('Erro por estrutura inválida', () => {
    const url = 'asdasasfa.comasd.asd'

    const webUrl = WebUrl.create(url)

    expect(webUrl).toBeInstanceOf(Left)
    expect((webUrl as Left<string>).value).toBe('Estrutura inválida')
  })
})
