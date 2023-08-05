import {
  randCompanyName,
  randParagraph,
  randPhrase,
  randSlug,
  randUrl,
  randWord,
} from '@ngneat/falso'
import { Request, Response } from 'express'

import { FakeAdminMiddleware } from '../../../../tests/middlewares/fake-admin.middleware'
import { FakeCreateProjectUC } from '../../../../tests/usecases/fake-create-project.usecase'
import { ThrowErrorCreateProjectUC } from '../../../../tests/usecases/throw-error-create-project.usecase'
import { CreateProjectController } from './create-project.controller'
import { IController } from './ports/controller.port'

test('Deve chamar o usecase', async () => {
  const sendFunc = jest.fn()

  const projectData = { name: randCompanyName(), description: randParagraph() }

  const mockReq = {
    headers: { authorization: process.env.ADMIN_AUTHORIZATION },
    body: projectData,
  } as Request
  const mockRes = {
    status: jest.fn(() => ({ send: sendFunc })),
    send: sendFunc,
  } as unknown as Response

  const middleware = new FakeAdminMiddleware(process.env.ADMIN_AUTHORIZATION!)
  const usecase = new FakeCreateProjectUC()
  const controller: IController = new CreateProjectController(
    middleware,
    usecase,
  )

  await controller.handle(mockReq, mockRes)

  expect(middleware.execute).toHaveBeenCalledWith(mockReq.headers.authorization)
  expect(usecase.execute).toHaveBeenCalledWith(projectData)
  expect(sendFunc).toHaveBeenCalledWith({ project: expect.any(Object) })
  expect(mockRes.status).toHaveBeenCalledWith(201)
})

test('Deve chamar o usecase apenas com as props que forem do usecase', async () => {
  const sendFunc = jest.fn()

  const body = {
    name: randCompanyName(),
    description: randParagraph(),
    nousecaseprop: 'something',
  }

  const mockReq = {
    headers: { authorization: process.env.ADMIN_AUTHORIZATION },
    body,
  } as Request
  const mockRes = {
    status: jest.fn(() => ({ send: sendFunc })),
    send: sendFunc,
  } as unknown as Response

  const middleware = new FakeAdminMiddleware(process.env.ADMIN_AUTHORIZATION!)
  const usecase = new FakeCreateProjectUC()
  const controller: IController = new CreateProjectController(
    middleware,
    usecase,
  )

  await controller.handle(mockReq, mockRes)

  expect(middleware.execute).toHaveBeenCalledWith(mockReq.headers.authorization)
  expect(usecase.execute).toHaveBeenCalledWith({
    name: body.name,
    description: body.description,
  })
  expect(sendFunc).toHaveBeenCalledWith({ project: expect.any(Object) })
  expect(mockRes.status).toHaveBeenCalledWith(201)
})

test('Deve chamar o usecase com todas as props do usecase', async () => {
  const sendFunc = jest.fn()

  const body = {
    name: randCompanyName(),
    description: randParagraph(),
    usedTechnologies: [randCompanyName()],
    features: [randPhrase()],
    keywords: [randWord()],
    slug: randSlug(),
    repositoryUrl: randUrl(),
    link: randUrl(),
    bannerUrl: randUrl(),
    previewImageUrl: randUrl(),
  }

  const mockReq = {
    headers: { authorization: process.env.ADMIN_AUTHORIZATION },
    body,
  } as Request
  const mockRes = {
    status: jest.fn(() => ({ send: sendFunc })),
    send: sendFunc,
  } as unknown as Response

  const middleware = new FakeAdminMiddleware(process.env.ADMIN_AUTHORIZATION!)
  const usecase = new FakeCreateProjectUC()
  const controller: IController = new CreateProjectController(
    middleware,
    usecase,
  )

  await controller.handle(mockReq, mockRes)

  expect(middleware.execute).toHaveBeenCalledWith(mockReq.headers.authorization)
  expect(usecase.execute).toHaveBeenCalledWith(body)
  expect(sendFunc).toHaveBeenCalledWith({ project: expect.any(Object) })
  expect(mockRes.status).toHaveBeenCalledWith(201)
})

// Passar no middleware de admin antes de rodar o usecase
test('Deve retornar uma mensagem de erro antes de rodar o usecase', async () => {
  const sendFunc = jest.fn()

  const projectData = { name: randCompanyName(), description: randParagraph() }

  const mockReq = {
    headers: { authorization: undefined },
    body: projectData,
  } as Request
  const mockRes = {
    status: jest.fn(() => ({ send: sendFunc })),
    send: sendFunc,
  } as unknown as Response

  const middleware = new FakeAdminMiddleware(process.env.ADMIN_AUTHORIZATION!)
  const usecase = new FakeCreateProjectUC()
  const controller: IController = new CreateProjectController(
    middleware,
    usecase,
  )

  await controller.handle(mockReq, mockRes)

  expect(middleware.execute).toHaveBeenCalledWith(mockReq.headers.authorization)
  expect(usecase.execute).not.toHaveBeenCalled()
  expect(mockRes.status).toHaveBeenCalledWith(401)
  expect(sendFunc).toHaveBeenCalledWith({ message: expect.any(String) })
})

test('Deve retornar uma mensagem de erro por body errado', async () => {
  const sendFunc = jest.fn()

  const projectData = {}

  const mockReq = {
    headers: { authorization: process.env.ADMIN_AUTHORIZATION },
    body: projectData,
  } as Request
  const mockRes = {
    status: jest.fn(() => ({ send: sendFunc })),
    send: sendFunc,
  } as unknown as Response

  const middleware = new FakeAdminMiddleware(process.env.ADMIN_AUTHORIZATION!)
  const usecase = new FakeCreateProjectUC()
  const controller: IController = new CreateProjectController(
    middleware,
    usecase,
  )

  await controller.handle(mockReq, mockRes)

  expect(middleware.execute).toHaveBeenCalledWith(mockReq.headers.authorization)
  expect(usecase.execute).toHaveBeenCalledWith(projectData)
  expect(mockRes.status).toHaveBeenCalledWith(400)
  expect(sendFunc).toHaveBeenCalledWith({ message: expect.any(String) })
})

test('Deve retornar uma mensagem com status 500 se lançar uma exceção', async () => {
  const sendFunc = jest.fn()

  const projectData = { name: randCompanyName(), description: randParagraph() }

  const mockReq = {
    headers: { authorization: process.env.ADMIN_AUTHORIZATION },
    body: projectData,
  } as Request
  const mockRes = {
    status: jest.fn(() => ({ send: sendFunc })),
    send: sendFunc,
  } as unknown as Response

  const middleware = new FakeAdminMiddleware(process.env.ADMIN_AUTHORIZATION!)
  const usecase = new ThrowErrorCreateProjectUC()
  const controller: IController = new CreateProjectController(
    middleware,
    usecase,
  )

  await controller.handle(mockReq, mockRes)

  expect(middleware.execute).toHaveBeenCalledWith(mockReq.headers.authorization)
  expect(usecase.execute).toHaveBeenCalledWith(projectData)
  expect(mockRes.status).toHaveBeenCalledWith(500)
  expect(sendFunc).toHaveBeenCalledWith({
    message: 'Houve um erro nosso aqui. Desculpa!',
  })
})
