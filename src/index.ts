import chalk from 'chalk'

import { app } from './main/express/app'
import * as mongo from './main/mongo'

mongo.connect()

const PORT = process.env.PORT

app.listen(PORT, () =>
  console.log(
    chalk.cyan('✓'),
    `Uhull!! Na ativa e contando... Porta: ${PORT}!`,
  ),
)
