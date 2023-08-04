export interface ITechnologiesRepository {
  existsWithAllTheseNames: (names: string[]) => Promise<boolean>
}
