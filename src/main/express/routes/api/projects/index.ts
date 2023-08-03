import { Router } from 'express'

import { makeCreateProjectController } from '../../../../../factories/create-project.factory'
import { makeGetProjectsController } from '../../../../../factories/get-projects.factory'

const router = Router()

router.get('/', makeGetProjectsController().handle)
router.post('/', makeCreateProjectController().handle)

export { router as projectsRouter }
