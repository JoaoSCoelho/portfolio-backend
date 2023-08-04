import { CreateTechnologyController } from '../application/adapters/controllers/create-technology.controller'
import { AdminMiddleware } from '../application/middlewares/admin.middleware'
import { CreateTechnologyUC } from '../application/usecases/create-technology.usecase'
import { MongoTechnologiesRepository } from '../external/repositories/mongodb/technologies'
import { TechnologyModel } from '../external/repositories/mongodb/technologies/model'

export function makeCreateTechnologyController() {
  const technologiesRepository = new MongoTechnologiesRepository(
    TechnologyModel,
  )
  const createTechnologyUC = new CreateTechnologyUC(technologiesRepository)
  const adminMiddleware = new AdminMiddleware()
  return new CreateTechnologyController(adminMiddleware, createTechnologyUC)
}
