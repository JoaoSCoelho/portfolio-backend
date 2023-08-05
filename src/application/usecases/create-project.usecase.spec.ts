import {
  randCompanyName,
  randParagraph,
  randPhrase,
  randSlug,
  randUrl,
  randWord,
} from '@ngneat/falso'
import { randomUUID } from 'crypto'

import { InMemoryProjectsRepository } from '../../../tests/repositories/in-memory-projects-repository'
import { InMemoryTechnologiesRepository } from '../../../tests/repositories/in-memory-technologies-repository'
import { Project } from '../../domain/entities/project'
import { Left } from '../../shared/either'
import { slugify } from '../../shared/slugify'
import { CreateProjectUC } from './create-project.usecase'

test('Deve criar um novo Project apenas com os dados essenciais', async () => {
  const projectData = { name: randCompanyName(), description: randParagraph() }
  const repository = new InMemoryProjectsRepository()
  const techRepository = new InMemoryTechnologiesRepository()
  const usecase = new CreateProjectUC(repository, techRepository)

  const project = await usecase.execute(projectData)

  expect(project).not.toBeInstanceOf(Left)
  expect(project).toBeInstanceOf(Project)
  expect(project).toEqual({
    id: expect.any(String),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
    slug: slugify(projectData.name),
    usedTechnologies: [],
    features: [],
    keywords: [],
    ...projectData,
  })
  expect(repository.db[0]).toEqual(project)
})

test('Deve criar um novo Project com todos os dados', async () => {
  const data = {
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
  const repository = new InMemoryProjectsRepository()
  const techRepository = new InMemoryTechnologiesRepository()

  techRepository.db.push({
    aliases: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    id: randomUUID(),
    keywords: [],
    name: data.usedTechnologies[0],
  })

  const usecase = new CreateProjectUC(repository, techRepository)

  const project = await usecase.execute(data)

  expect(project).not.toBeInstanceOf(Left)
  expect(project).toBeInstanceOf(Project)
  expect(project).toEqual({
    id: expect.any(String),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
    ...data,
  })
  expect(repository.db[0]).toEqual(project)
})

describe('Deve retornar uma mensagem de erro', () => {
  test('nome inválido', async () => {
    const projectData = { name: 6543231 as any, description: randParagraph() }
    const repository = new InMemoryProjectsRepository()
    const techRepository = new InMemoryTechnologiesRepository()
    const usecase = new CreateProjectUC(repository, techRepository)

    const project = await usecase.execute(projectData)

    expect(project).toBeInstanceOf(Left)
    expect(
      (project as Left<string>).value.startsWith(
        'Deu merda aqui instanciando o project: >> ',
      ),
    ).toBeTruthy()
    expect(repository.db).toEqual([])
  })
})

// Erro por n existir uma das tecnologias
