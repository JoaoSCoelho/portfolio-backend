/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from 'jest'
import { resolve } from 'path'

import rootConfig from '../../jest.config'

const rootDir = resolve(__dirname, '../..')

{
  // This block is a jest issue
  delete rootConfig.collectCoverage
  delete rootConfig.coverageProvider
  delete rootConfig.projects
}

const config: Config = {
  ...rootConfig,
  rootDir,
  displayName: 'db',
  setupFilesAfterEnv: ['<rootDir>/tests/database/jest-setup.ts'],
  testMatch: [
    '<rootDir>/tests/database/**/*.test.ts',
    '<rootDir>/tests/database/**/*.spec.ts',
  ],
}

export default config
