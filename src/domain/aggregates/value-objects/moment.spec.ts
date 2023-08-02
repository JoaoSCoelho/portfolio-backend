import { Left } from '../../../shared/either'
import { Moment } from './moment'

test('Deve instanciar um Moment', () => {
  const date = new Date()

  const moment = Moment.create(date)

  expect(moment).toBeInstanceOf(Moment)
})

describe('Deve retornar uma mensagem de incompatibilidade', () => {
  test('Incompatibilidade por O tipo disso aí não tem nada a ver', () => {
    const date = false

    const moment = Moment.create(date as any)

    expect(moment).toBeInstanceOf(Left)
    expect((moment as Left<string>).value).toBe(
      'O tipo disso aí não tem nada a ver',
    )
  })

  test('Incompatibilidade por não ser instacia de Date', () => {
    const date = null

    const moment = Moment.create(date as any)

    expect(moment).toBeInstanceOf(Left)
    expect((moment as Left<string>).value).toBe(
      'Se não instancia Date não é data parceiro',
    )
  })

  test('Incompatibilidade por ser uma data inválida', () => {
    const date = new Date('no-date')

    const moment = Moment.create(date)

    expect(moment).toBeInstanceOf(Left)
    expect((moment as Left<string>).value).toBe('Isso só data em outro mundo')
  })
})
