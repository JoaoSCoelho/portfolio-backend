import { Either, Left, left } from '../../../shared/either'
import { List } from './list'
import { IValueObject } from './ports/value-object.port'

class ItemVo implements IValueObject {
  static create(value: string): Either<string, ItemVo> {
    if (value === 'no-pass') return left('erro')
    return new ItemVo()
  }
}

test('Deve instanciar um novo array', () => {
  const array = ['coisa', 9876, false, () => 'hello world', {}, []]

  const list = List.create(array, ItemVo)

  expect(list).toEqual(array.map(() => new ItemVo()))
})

describe('Retornando erro', () => {
  test('Erro por não ser um array', () => {
    const array = false

    const list = List.create(array as any, ItemVo)

    expect(list).toBeInstanceOf(Left)
    expect((list as Left<string>).value).toBe(
      'O tipo disso aí não tem nada a ver',
    )
  })

  test('Erro por um dos itens não passar no teste', () => {
    const array = ['something', 'something else', 'no-pass']

    const list = List.create(array, ItemVo)

    expect(list).toBeInstanceOf(Left)
    expect((list as Left<string>).value).toBe(
      'Ihh, o item de indíce 2 ta de intruso: >> erro',
    )
  })
})
