import { Router } from 'express'

import { makeCreateTechnologyController } from '../../../../../factories/create-technology.factory'
import { makeGetTechnologiesController } from '../../../../../factories/get-technologies.factory'

const router = Router()

router.get('/', makeGetTechnologiesController().handle)
router.post('/', makeCreateTechnologyController().handle)

export { router as technologiesRouter }
