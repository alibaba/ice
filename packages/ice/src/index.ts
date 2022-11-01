import type { UserConfig } from './types/userConfig.js';

export function defineConfig(config: UserConfig) {
  return config;
}

export type { UserConfig };

export * from './test/index.js';
