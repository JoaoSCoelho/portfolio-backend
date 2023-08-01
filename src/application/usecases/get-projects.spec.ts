import { InMemoryProjectsRepository } from '../../../tests/repositories/projects-repository'
import { Project } from '../../domain/entities/project'
import { GetProjects } from './get-projects'

test('Deve retornar todos os projetos', async () => {
  const inMemoryProjectsRepository = new InMemoryProjectsRepository()
  const getProjectsUC = new GetProjects(inMemoryProjectsRepository)

  const projects = await getProjectsUC.execute()

  expect(Array.isArray(projects)).toBeTruthy()
  expect(projects.every((project) => project instanceof Project)).toBeTruthy()
})
