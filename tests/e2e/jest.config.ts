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
  displayName: 'e2e',
  setupFilesAfterEnv: ['<rootDir>/tests/e2e/jest-setup.ts'],
  testMatch: [
    '<rootDir>/tests/e2e/**/*.test.ts',
    '<rootDir>/tests/e2e/**/*.spec.ts',
  ],
}

export default config
