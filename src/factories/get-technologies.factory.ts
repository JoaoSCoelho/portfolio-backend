import { GetTechnologiesController } from '../application/adapters/controllers/get-technologies.controller'
import { GetTechnologiesUC } from '../application/usecases/get-technologies.usecase'
import { MongoTechnologiesRepository } from '../external/repositories/mongodb/technologies'
import { TechnologyModel } from '../external/repositories/mongodb/technologies/model'

export function makeGetTechnologiesController() {
  const technologiesRepository = new MongoTechnologiesRepository(
    TechnologyModel,
  )
  const getTechnologiesUC = new GetTechnologiesUC(technologiesRepository)
  return new GetTechnologiesController(getTechnologiesUC)
}
