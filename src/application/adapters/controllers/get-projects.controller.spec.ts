import { Request, Response } from 'express'

import { FakeGetProjectsUC } from '../../../../tests/usecases/fake-get-projects.usecase'
import { GetProjectsController } from './get-projects.controller'

test('Deve chamar o usecase e retornar ', async () => {
  const mockReq = {} as Request
  const mockRes = { send: jest.fn() } as unknown as Response

  const useCase = new FakeGetProjectsUC()

  const controller = new GetProjectsController(useCase)

  await controller.handle(mockReq, mockRes)

  expect(useCase.execute).toHaveBeenCalledWith()
  expect(mockRes.send).toHaveBeenCalledWith({ projects: expect.any(Array) })
})
