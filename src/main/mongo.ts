import chalk from 'chalk'
import mongoose from 'mongoose'

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!)

    console.log(chalk.cyan('✓'), 'Mongo está no controle meu patrão!')
  } catch (e) {
    console.error(`${chalk.red('✘')} Aí agora lascou: ${e}`)
  }
}
