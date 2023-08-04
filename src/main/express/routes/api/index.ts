import { Router } from 'express'

import { projectsRouter } from './projects'
import { technologiesRouter } from './technologies'

const router = Router()

router.use('/projects', projectsRouter)
router.use('/technologies', technologiesRouter)

export { router as apiRouter }
