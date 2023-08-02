import dotenv from 'dotenv'
import express from 'express'

import { bodyParser } from './middleware/body-parser'
import { cors } from './middleware/cors'
import { limiter } from './middleware/rate-limit'
import { router } from './routes'

dotenv.config()

const app = express()

app.use(limiter(), cors, bodyParser) // Configurando middlewares globais
app.use(router) // Setando rotas

export { app }
