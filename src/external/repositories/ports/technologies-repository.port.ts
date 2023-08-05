import { TechnologyName } from '../../../domain/aggregates/value-objects/technology-name'
import { Technology } from '../../../domain/entities/technology'

export interface ITechnologiesRepository {
  existsWithAllTheseNames: (names: TechnologyName[]) => Promise<boolean>
  create: (technology: Technology) => Promise<void>
  all: () => Promise<Technology[]>
}
