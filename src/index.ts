import chalk from 'chalk'

import { app } from './main/express/app'
import * as mongo from './main/mongo'
;(async () => {
  if (process.env.NORMALIZE_DATABASE_BEFORE_START === 'true') {
    await mongo.connect()
    await mongo.normalizeDatabase()
  } else {
    mongo.connect()
  }

  const PORT = process.env.PORT

  app.listen(PORT, () =>
    console.log(
      chalk.cyan('✓'),
      `Uhull!! Na ativa e contando... Porta: ${PORT}!`,
    ),
  )
})()
