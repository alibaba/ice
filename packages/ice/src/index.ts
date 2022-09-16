import type { UserConfig } from '@ice/types';

export function defineConfig(config: UserConfig) {
  return config;
}

export type { UserConfig };

export * from './test/index.js';
