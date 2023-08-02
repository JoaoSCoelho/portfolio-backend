import { Router } from 'express'

import { makeGetProjectsController } from '../../../../../factories/get-projects.factory'

const router = Router()

router.get('/', makeGetProjectsController().handle)

export { router as projectsRouter }
