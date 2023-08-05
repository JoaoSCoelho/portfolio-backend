import chalk from 'chalk'
import mongoose from 'mongoose'

import { ProjectModel } from '../external/repositories/mongodb/projects/model'
import { TechnologyModel } from '../external/repositories/mongodb/technologies/model'
import { slugify } from '../shared/slugify'

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!)

    console.log(chalk.cyan('✓'), 'Mongo está no controle meu patrão!')
  } catch (e) {
    console.error(`${chalk.red('✘')} Aí agora lascou: ${e}`)
  }
}

// Essa função pode sobrecarregar o seu servidor de banco de dados,
// você pode desativá-la setando como a variável de ambiente:
// NORMALIZE_DATABASE_BEFORE_START=false
export async function normalizeDatabase() {
  console.log(chalk.greenBright('→'), 'Normalizando banco de dados')
  try {
    // Normalize Projects
    const dbProjects = await ProjectModel.find()

    // name === undefined
    const withoutNameDbProjectsIds = dbProjects
      .filter((dbP) => dbP.name === undefined)
      .map((p) => p.id)

    await ProjectModel.updateMany(
      { id: { $in: withoutNameDbProjectsIds } },
      { name: 'NO-NAME', normalized: `"name" in: ${new Date()}` },
    )
    if (withoutNameDbProjectsIds.length)
      console.log(
        chalk.red('!'),
        `${withoutNameDbProjectsIds.length} projects no banco sem nome foram normalizados`,
      )

    // description === undefined
    const withoutDescriptionDbProjectsIds = dbProjects
      .filter((dbP) => dbP.description === undefined)
      .map((p) => p.id)

    await ProjectModel.updateMany(
      { id: { $in: withoutDescriptionDbProjectsIds } },
      {
        description: 'NO-DESCRIPTION',
        normalized: `"description" in: ${new Date()}`,
      },
    )
    if (withoutDescriptionDbProjectsIds.length)
      console.log(
        chalk.red('!'),
        `${withoutDescriptionDbProjectsIds.length} projects no banco sem descrição foram normalizados`,
      )

    // usedTechnologies === undefined
    const withoutUsedTechnologiesDbProjectsIds = dbProjects
      .filter((dbP) => dbP.usedTechnologies === undefined)
      .map((p) => p.id)

    await ProjectModel.updateMany(
      { id: { $in: withoutUsedTechnologiesDbProjectsIds } },
      {
        usedTechnologies: [],
        normalized: `"usedTechnologies" in: ${new Date()}`,
      },
    )
    if (withoutUsedTechnologiesDbProjectsIds.length)
      console.log(
        chalk.red('!'),
        `${withoutUsedTechnologiesDbProjectsIds.length} projects no banco sem uedTechnologies foram normalizados`,
      )

    // features === undefined
    const withoutFeaturesDbProjectsIds = dbProjects
      .filter((dbP) => dbP.features === undefined)
      .map((p) => p.id)

    await ProjectModel.updateMany(
      { id: { $in: withoutFeaturesDbProjectsIds } },
      { features: [], normalized: `"features" in: ${new Date()}` },
    )
    if (withoutFeaturesDbProjectsIds.length)
      console.log(
        chalk.red('!'),
        `${withoutFeaturesDbProjectsIds.length} projects no banco sem features foram normalizados`,
      )

    // keywords === undefined
    const withoutKeywordsDbProjectsIds = dbProjects
      .filter((dbP) => dbP.keywords === undefined)
      .map((p) => p.id)

    await ProjectModel.updateMany(
      { id: { $in: withoutKeywordsDbProjectsIds } },
      { keywords: [], normalized: `"keywords" in: ${new Date()}` },
    )
    if (withoutKeywordsDbProjectsIds.length)
      console.log(
        chalk.red('!'),
        `${withoutKeywordsDbProjectsIds.length} projects no banco sem keywords foram normalizados`,
      )

    // slug === undefined
    const withoutSlugDbProjectsIds = dbProjects
      .filter((dbP) => dbP.slug === undefined)
      .map((p) => p.id)

    await Promise.all(
      withoutSlugDbProjectsIds.map(
        async (id) =>
          await ProjectModel.updateOne(
            { id },
            { slug: slugify(id), normalized: `"slug" in: ${new Date()}` },
          ),
      ),
    )
    if (withoutSlugDbProjectsIds.length)
      console.log(
        chalk.red('!'),
        `${withoutSlugDbProjectsIds.length} projects no banco sem slug foram normalizados`,
      )

    // createdAt === undefined
    const withoutCreatedAtDbProjectsIds = dbProjects
      .filter((dbP) => dbP.createdAt === undefined)
      .map((p) => p.id)

    await ProjectModel.updateMany(
      { id: { $in: withoutCreatedAtDbProjectsIds } },
      { createdAt: new Date(), normalized: `"createdAt" in: ${new Date()}` },
    )
    if (withoutCreatedAtDbProjectsIds.length)
      console.log(
        chalk.red('!'),
        `${withoutCreatedAtDbProjectsIds.length} projects no banco sem createdAt foram normalizados`,
      )

    // updatedAt === undefined
    const withoutUpdatedAtDbProjectsIds = dbProjects
      .filter((dbP) => dbP.updatedAt === undefined)
      .map((p) => p.id)

    await ProjectModel.updateMany(
      { id: { $in: withoutUpdatedAtDbProjectsIds } },
      { updatedAt: new Date(), normalized: `"updatedAt" in: ${new Date()}` },
    )
    if (withoutUpdatedAtDbProjectsIds.length)
      console.log(
        chalk.red('!'),
        `${withoutUpdatedAtDbProjectsIds.length} projects no banco sem updatedAt foram normalizados`,
      )

    // Normalize Technologies
    const dbTechnologies = await TechnologyModel.find()

    // name === undefined
    const withoutNameDbTechnologiesIds = dbTechnologies
      .filter((dbP) => dbP.name === undefined)
      .map((p) => p.id)

    await Promise.all(
      withoutNameDbTechnologiesIds.map(
        async (id) =>
          await TechnologyModel.updateOne(
            { id },
            { name: id, normalized: `"name" in: ${new Date()}` },
          ),
      ),
    )
    if (withoutNameDbTechnologiesIds.length)
      console.log(
        chalk.red('!'),
        `${withoutNameDbTechnologiesIds.length} technologies no banco sem nome foram normalizados`,
      )

    // keywords === undefined
    const withoutKeywordsDbTechnologiesIds = dbTechnologies
      .filter((dbP) => dbP.keywords === undefined)
      .map((p) => p.id)

    await TechnologyModel.updateMany(
      { id: { $in: withoutKeywordsDbTechnologiesIds } },
      { keywords: [], normalized: `"keywords" in: ${new Date()}` },
    )
    if (withoutKeywordsDbTechnologiesIds.length)
      console.log(
        chalk.red('!'),
        `${withoutKeywordsDbTechnologiesIds.length} technologies no banco sem keywords foram normalizados`,
      )

    // aliases === undefined
    const withoutAliasesDbTechnologiesIds = dbTechnologies
      .filter((dbP) => dbP.aliases === undefined)
      .map((p) => p.id)

    await TechnologyModel.updateMany(
      { id: { $in: withoutAliasesDbTechnologiesIds } },
      { aliases: [], normalized: `"aliases" in: ${new Date()}` },
    )
    if (withoutAliasesDbTechnologiesIds.length)
      console.log(
        chalk.red('!'),
        `${withoutAliasesDbTechnologiesIds.length} technologies no banco sem aliases foram normalizados`,
      )

    // createdAt === undefined
    const withoutCreatedAtDbTechnologiesIds = dbTechnologies
      .filter((dbP) => dbP.createdAt === undefined)
      .map((p) => p.id)

    await TechnologyModel.updateMany(
      { id: { $in: withoutCreatedAtDbTechnologiesIds } },
      { createdAt: new Date(), normalized: `"createdAt" in: ${new Date()}` },
    )
    if (withoutCreatedAtDbTechnologiesIds.length)
      console.log(
        chalk.red('!'),
        `${withoutCreatedAtDbTechnologiesIds.length} technologies no banco sem createdAt foram normalizados`,
      )

    // updatedAt === undefined
    const withoutUpdatedAtDbTechnologiesIds = dbTechnologies
      .filter((dbP) => dbP.updatedAt === undefined)
      .map((p) => p.id)

    await TechnologyModel.updateMany(
      { id: { $in: withoutUpdatedAtDbTechnologiesIds } },
      { updatedAt: new Date(), normalized: `"updatedAt" in: ${new Date()}` },
    )
    if (withoutUpdatedAtDbTechnologiesIds.length)
      console.log(
        chalk.red('!'),
        `${withoutUpdatedAtDbTechnologiesIds.length} technologies no banco sem updatedAt foram normalizados`,
      )

    console.log(chalk.cyan('✓'), 'Banco de dados totalmente normalizado')
  } catch (error) {
    console.error(chalk.red('✘'), 'Erro ao normalizar banco de dados:', error)
  }
}
