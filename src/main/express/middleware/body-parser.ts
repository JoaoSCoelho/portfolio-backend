import { json } from 'express'

export const bodyParser = json({ limit: '10MB' })
