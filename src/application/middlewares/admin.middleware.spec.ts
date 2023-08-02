import { Left } from '../../shared/either'
import { AdminMiddleware } from './admin.middleware'

test('Deve barrar a passagem de alguém que não é administrador', () => {
  const middleware = new AdminMiddleware()

  const authorization = 'NOADMINAUTHORIZATION'

  const result = middleware.execute(authorization)

  expect(result).toBeInstanceOf(Left)
  expect((result as Left<string>).value).toBe('Tu não é administrador colega!')
})

test('Deve retornar true para um admin', () => {
  const middleware = new AdminMiddleware()

  const authorization = process.env.ADMIN_AUTHORIZATION!

  const result = middleware.execute(authorization)

  expect(result).toBe(true)
})
