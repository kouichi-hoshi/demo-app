import { loadEnvConfig } from '@next/env'

const setupTestEnvironment = async (): Promise<void> => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}

export default setupTestEnvironment
