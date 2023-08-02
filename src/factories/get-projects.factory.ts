import { GetProjectsController } from '../application/adapters/controllers/get-projects.controller'
import { GetProjectsUC } from '../application/usecases/get-projects'
import { MongoProjectsRepository } from '../external/repositories/mongodb/projects'
import { ProjectModel } from '../external/repositories/mongodb/projects/model'

export function makeGetProjectsController() {
  const projectsRepository = new MongoProjectsRepository(ProjectModel)
  const getProjectsUC = new GetProjectsUC(projectsRepository)

  return new GetProjectsController(getProjectsUC)
}
