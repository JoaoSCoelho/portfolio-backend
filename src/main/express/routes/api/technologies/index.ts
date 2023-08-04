import { Router } from 'express'

import { makeCreateTechnologyController } from '../../../../../factories/create-technology.factory'

const router = Router()

// router.get('/', makeGetTechnologiesController().handle)
router.post('/', makeCreateTechnologyController().handle)

export { router as technologiesRouter }
