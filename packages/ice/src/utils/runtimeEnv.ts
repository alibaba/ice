import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { expand as dotenvExpand } from 'dotenv-expand';
import type { CommandArgs, CommandName } from 'build-scripts';

export type AppConfig = Record<string, any>;
export interface Envs {
  [key: string]: string;
}

export async function initProcessEnv(rootDir: string, command: CommandName, commandArgs: CommandArgs): Promise<void> {
  const { mode } = commandArgs;

  // .env.${mode}.local is the highest priority
  const dotenvFiles = [
    `.env.${mode}.local`,
    `.env.${mode}`,
    '.env.local',
    '.env',
  ];

  dotenvFiles.forEach(dotenvFile => {
    const filepath = path.join(rootDir, dotenvFile);
    if (fs.existsSync(dotenvFile)) {
      dotenvExpand(
        dotenv.config({
          path: filepath,
        }),
      );
    }
  });

  process.env.ICE_CORE_MODE = mode;
  process.env.ICE_CORE_DEV_PORT = commandArgs.port;

  if (command === 'start') {
    process.env.NODE_ENV = 'development';
  } else if (command === 'test') {
    process.env.NODE_ENV = 'test';
  } else {
    // build
    process.env.NODE_ENV = 'production';
  }

  // set runtime initial env
  process.env.ICE_CORE_ROUTER = 'true';
  process.env.ICE_CORE_ERROR_BOUNDARY = 'true';
  process.env.ICE_CORE_INITIAL_DATA = 'true';
}

export const updateRuntimeEnv = (appConfig: AppConfig, disableRouter: boolean) => {
  if (!appConfig?.app?.getInitialData) {
    process.env['ICE_CORE_INITIAL_DATA'] = 'false';
  }
  if (!appConfig?.app?.errorBoundary) {
    process.env['ICE_CORE_ERROR_BOUNDARY'] = 'false';
  }
  if (disableRouter) {
    process.env['ICE_CORE_ROUTER'] = 'false';
  }
};

export function getCoreEnvKeys() {
  return ['ICE_CORE_MODE', 'ICE_CORE_ROUTER', 'ICE_CORE_ERROR_BOUNDARY', 'ICE_CORE_INITIAL_DATA', 'ICE_CORE_DEV_PORT'];
}