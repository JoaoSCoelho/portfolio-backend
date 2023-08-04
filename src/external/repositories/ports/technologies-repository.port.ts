import { Technology } from '../../../domain/entities/technology'

export interface ITechnologiesRepository {
  existsWithAllTheseNames: (names: string[]) => Promise<boolean>
  create: (technology: Technology) => Promise<void>
}
