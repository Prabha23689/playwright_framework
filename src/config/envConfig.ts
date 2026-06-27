import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

const ENV_FILES = ['.env', '.env.dev', '.env.qa', '.env.stage', '.env.prod'];

export interface EnvConfig {
  NODE_ENV?: string;
  ENVIRONMENT?: string;
  BASE_URL?: string;
  TEST_TIMEOUT?: string;
  GLOBAL_TIMEOUT?: string;
  EXPECT_TIMEOUT?: string;
  ACTION_TIMEOUT?: string;
  HEADLESS?: string;
  VIEWPORT_WIDTH?: string;
  VIEWPORT_HEIGHT?: string;
  TRACE?: string;
  CI_RETRIES?: string;
  LOCAL_RETRIES?: string;
  CI_WORKERS?: string;
  IGNORE_HTTPS?: string;
  LOCALE?: string;
  TIMEZONE?: string;
  PERMISSIONS?: string;
  BROWSER_ARGS?: string;
  PROXY?: string;
  STORAGE_STATE?: string;
  SLOW_MO?: string;
}

export const env: EnvConfig = process.env as EnvConfig;

export function loadEnvironment(): void {
  const selectedEnv = process.env.ENVIRONMENT || process.env.NODE_ENV || 'dev';
  const envFile = `.env.${selectedEnv}`;
  const rootPath = path.resolve(process.cwd());

  if (fs.existsSync(path.join(rootPath, envFile))) {
    dotenv.config({ path: path.join(rootPath, envFile) });
  } else if (fs.existsSync(path.join(rootPath, '.env'))) {
    dotenv.config({ path: path.join(rootPath, '.env') });
  }

  dotenv.config({ path: path.join(rootPath, '.env') });
}
