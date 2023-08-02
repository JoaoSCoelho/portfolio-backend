import { randomUUID } from 'crypto'

import { Left } from '../../../shared/either'
import { ID } from './id'

test('Deve instanciar um novo ID', () => {
  const idStr = randomUUID()

  const id = ID.create(idStr)

  expect(id).toBe(idStr)
})

test('Deve retornar uma mensagem de incompatibilidade', () => {
  const idStr = 46523216546654

  const id = ID.create(idStr as any)

  expect(id).toBeInstanceOf(Left)
  expect((id as Left<string>).value).toBe('O tipo disso aí não tem nada a ver')
})
