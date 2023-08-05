import { Router } from 'express'

import { makeCreateProjectController } from '../../../../../factories/create-project.factory'
import { makeGetProjectsController } from '../../../../../factories/get-projects.factory'
import { makeUpdateProjectController } from '../../../../../factories/update-project.factory'

const router = Router()

router.get('/', makeGetProjectsController().handle)
router.post('/', makeCreateProjectController().handle)
router.put('/:id', makeUpdateProjectController().handle)

export { router as projectsRouter }
