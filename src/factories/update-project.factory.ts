import { UpdateProjectController } from '../application/adapters/controllers/update-project.controller'
import { AdminMiddleware } from '../application/middlewares/admin.middleware'
import { UpdateProjectUC } from '../application/usecases/update-project.usecase'
import { MongoProjectsRepository } from '../external/repositories/mongodb/projects'
import { ProjectModel } from '../external/repositories/mongodb/projects/model'
import { MongoTechnologiesRepository } from '../external/repositories/mongodb/technologies'
import { TechnologyModel } from '../external/repositories/mongodb/technologies/model'

export function makeUpdateProjectController() {
  const adminMiddleware = new AdminMiddleware()
  const projectsRepository = new MongoProjectsRepository(ProjectModel)
  const technologiesRepository = new MongoTechnologiesRepository(
    TechnologyModel,
  )
  const updateProjectUC = new UpdateProjectUC(
    projectsRepository,
    technologiesRepository,
  )
  return new UpdateProjectController(adminMiddleware, updateProjectUC)
}
