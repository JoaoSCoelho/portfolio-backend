import { CreateProjectController } from '../application/adapters/controllers/create-project.controller'
import { AdminMiddleware } from '../application/middlewares/admin.middleware'
import { CreateProjectUC } from '../application/usecases/create-project.usecase'
import { MongoProjectsRepository } from '../external/repositories/mongodb/projects'
import { ProjectModel } from '../external/repositories/mongodb/projects/model'
import { MongoTechnologiesRepository } from '../external/repositories/mongodb/technologies'
import { TechnologyModel } from '../external/repositories/mongodb/technologies/model'

export function makeCreateProjectController() {
  const adminMiddleware = new AdminMiddleware()
  const projectsRepository = new MongoProjectsRepository(ProjectModel)
  const technologiesRepository = new MongoTechnologiesRepository(
    TechnologyModel,
  )
  const createProjectUC = new CreateProjectUC(
    projectsRepository,
    technologiesRepository,
  )
  return new CreateProjectController(adminMiddleware, createProjectUC)
}
