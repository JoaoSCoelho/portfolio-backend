import { Request, Response } from 'express'

import { FakeGetProjectsUC } from '../../../../tests/usecases/fake-get-projects.usecase'
import { ThrowErrorGetProjectsUC } from '../../../../tests/usecases/throw-error-get-projects.usecase'
import { GetProjectsController } from './get-projects.controller'

test('Deve chamar o usecase e retornar os projects', async () => {
  const mockReq = {} as Request
  const mockRes = { send: jest.fn() } as unknown as Response

  const useCase = new FakeGetProjectsUC()

  const controller = new GetProjectsController(useCase)

  await controller.handle(mockReq, mockRes)

  expect(useCase.execute).toHaveBeenCalledWith()
  expect(mockRes.send).toHaveBeenCalledWith({ projects: expect.any(Array) })
})

test('Deve retornar uma mensagem com status 500 se lançar uma exceção', async () => {
  const sendFunc = jest.fn()

  const mockReq = {} as Request
  const mockRes = {
    status: jest.fn(() => ({ send: sendFunc })),
    send: sendFunc,
  } as unknown as Response

  const usecase = new ThrowErrorGetProjectsUC()
  const controller = new GetProjectsController(usecase)

  await controller.handle(mockReq, mockRes)

  expect(usecase.execute).toHaveBeenCalledWith()
  expect(mockRes.status).toHaveBeenCalledWith(500)
  expect(sendFunc).toHaveBeenCalledWith({
    message: 'Houve um erro nosso aqui. Desculpa!',
  })
})
