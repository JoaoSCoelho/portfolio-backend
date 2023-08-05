import {
  randCompanyName,
  randParagraph,
  randPhrase,
  randSlug,
  randUrl,
  randWord,
} from '@ngneat/falso'

import { InMemoryProjectsRepository } from '../../../tests/repositories/in-memory-projects-repository'
import { Project } from '../../domain/entities/project'
import { GetProjectsUC } from './get-projects.usecase'

test('Deve retornar todos os projetos', async () => {
  const inMemoryProjectsRepository = new InMemoryProjectsRepository()

  '.'
    .repeat(20)
    .split('')
    .map(() =>
      // Seta 20 Projects no repositório
      inMemoryProjectsRepository.db.push(
        Project.create({
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
        }) as Project,
      ),
    )

  const getProjectsUC = new GetProjectsUC(inMemoryProjectsRepository)

  const projects = await getProjectsUC.execute()

  expect(Array.isArray(projects)).toBeTruthy()
  expect(
    (projects as Project[]).every((project) => project instanceof Project),
  ).toBeTruthy()
})
