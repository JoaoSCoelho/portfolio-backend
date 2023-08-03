import { randCompanyName, randParagraph, randUrl } from '@ngneat/falso'

import { InMemoryProjectsRepository } from '../../../tests/repositories/in-memory-projects-repository'
import { Project } from '../../domain/entities/project'
import { Left } from '../../shared/either'
import { CreateProjectUC } from './create-project.usecase'

test('Deve criar um novo Project apenas com os dados essenciais', async () => {
  const projectData = { name: randCompanyName(), description: randParagraph() }
  const repository = new InMemoryProjectsRepository()
  const usecase = new CreateProjectUC(repository)

  const project = await usecase.execute(projectData)

  expect(project).not.toBeInstanceOf(Left)
  expect(project).toBeInstanceOf(Project)
  expect(project).toEqual({
    id: expect.any(String),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
    ...projectData,
  })
  expect(repository.db[0]).toEqual(project)
})

test('Deve criar um novo Project com todos os dados', async () => {
  const projectData = {
    name: randCompanyName(),
    description: randParagraph(),
    link: randUrl(),
    repositoryUrl: randUrl(),
  }
  const repository = new InMemoryProjectsRepository()
  const usecase = new CreateProjectUC(repository)

  const project = await usecase.execute(projectData)

  expect(project).not.toBeInstanceOf(Left)
  expect(project).toBeInstanceOf(Project)
  expect(project).toEqual({
    id: expect.any(String),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
    ...projectData,
  })
  expect(repository.db[0]).toEqual(project)
})

describe('Deve retornar uma mensagem de erro', () => {
  test('nome inválido', async () => {
    const projectData = { name: 6543231 as any, description: randParagraph() }
    const repository = new InMemoryProjectsRepository()
    const usecase = new CreateProjectUC(repository)

    const project = await usecase.execute(projectData)

    expect(project).toBeInstanceOf(Left)
    expect(
      (project as Left<string>).value.startsWith(
        'Deu merda aqui instanciando o project: →→ ',
      ),
    ).toBeTruthy()
    expect(repository.db).toEqual([])
  })
})
