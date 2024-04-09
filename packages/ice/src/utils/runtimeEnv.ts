import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { expand as dotenvExpand } from 'dotenv-expand';
import type { CommandArgs } from 'build-scripts';
import type { AppConfig } from '@ice/runtime/types';

export interface Envs {
  [key: string]: string;
}
interface EnvOptions {
  disableRouter: boolean;
  dataLoader: boolean;
}

const expandedEnvs = {};

/**
 * Set env params in .env file and built-in env params to process.env.
 */
export async function setEnv(
  rootDir: string,
  commandArgs: CommandArgs,
): Promise<void> {
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
    if (fs.existsSync(filepath)) {
      const expandOutput = dotenvExpand(
        dotenv.config({
          path: filepath,
        }),
      );
      Object.assign(expandedEnvs, expandOutput.parsed);
    }
  });

  process.env.ICE_CORE_MODE = mode;
  process.env.ICE_CORE_DEV_PORT = commandArgs.port;

  // set runtime initial env
  process.env.ICE_CORE_ROUTER = 'true';
  process.env.ICE_CORE_ERROR_BOUNDARY = 'true';
  process.env.ICE_CORE_INITIAL_DATA = 'true';
  // Set to false for compatibility with the old version.
  process.env.ICE_CORE_REMOVE_DATA_LOADER = 'false';

  // set ssr and ssg env to false, for remove dead code in CSR.
  process.env.ICE_CORE_SSG = 'false';
  process.env.ICE_CORE_SSR = 'false';
}

export const updateRuntimeEnv = (appConfig: AppConfig, options: EnvOptions) => {
  const { disableRouter, dataLoader } = options;
  if (!appConfig?.app?.errorBoundary) {
    process.env.ICE_CORE_ERROR_BOUNDARY = 'false';
  }
  if (disableRouter) {
    process.env.ICE_CORE_ROUTER = 'false';
  }
  if (!dataLoader) {
    process.env.ICE_CORE_REMOVE_DATA_LOADER = 'true';
  }
};

export function getCoreEnvKeys() {
  return [
    'ICE_CORE_MODE',
    'ICE_CORE_ROUTER',
    'ICE_CORE_ERROR_BOUNDARY',
    'ICE_CORE_INITIAL_DATA',
    'ICE_CORE_DEV_PORT',
    'ICE_CORE_REMOVE_DATA_LOADER',
  ];
}

export function getExpandedEnvs(): Record<string, string> {
  return expandedEnvs;
}
