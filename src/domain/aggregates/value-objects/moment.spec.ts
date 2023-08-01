import { Left } from '../../../shared/either'
import { Moment } from './moment'

test('Deve instanciar um Moment', () => {
  const date = new Date()

  const moment = Moment.create(date)

  expect(moment).toBeInstanceOf(Moment)
})

describe('Deve retornar uma mensagem de incompatibilidade', () => {
  test('Incompatibilidade por tipo inválido', () => {
    const date = false

    const moment = Moment.create(date as any)

    expect(moment).toBeInstanceOf(Left)
    expect((moment as Left<string>).value).toBe('Tipo inválido')
  })

  test('Incompatibilidade por não ser instacia de Date', () => {
    const date = null

    const moment = Moment.create(date as any)

    expect(moment).toBeInstanceOf(Left)
    expect((moment as Left<string>).value).toBe('Não é uma data')
  })

  test('Incompatibilidade por ser uma data inválida', () => {
    const date = new Date('no-date')

    const moment = Moment.create(date)

    expect(moment).toBeInstanceOf(Left)
    expect((moment as Left<string>).value).toBe('Data inválida')
  })
})
