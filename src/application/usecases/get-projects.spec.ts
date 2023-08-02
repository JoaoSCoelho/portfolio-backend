import { InMemoryProjectsRepository } from '../../../tests/repositories/in-memory-projects-repository'
import { Project } from '../../domain/entities/project'
import { GetProjectsUC } from './get-projects'

test('Deve retornar todos os projetos', async () => {
  const inMemoryProjectsRepository = new InMemoryProjectsRepository()
  const getProjectsUC = new GetProjectsUC(inMemoryProjectsRepository)

  const projects = await getProjectsUC.execute()

  expect(Array.isArray(projects)).toBeTruthy()
  expect(
    (projects as Project[]).every((project) => project instanceof Project),
  ).toBeTruthy()
})
