/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from 'jest'
import { resolve } from 'path'

import rootConfig from '../../jest.config'

const rootDir = resolve(__dirname, '../..')

const config: Config = {
  ...rootConfig,
  rootDir,
  displayName: 'end2end-tests',
  setupFilesAfterEnv: ['<rootDir>/tests/e2e/jest-setup.ts'],
  testMatch: [
    '<rootDir>/tests/e2e/**/*.test.ts',
    '<rootDir>/tests/e2e/**/*.spec.ts',
  ],
}

export default config
