import type { Request, Response } from 'express';
import type { UserConfig } from './types';
import { defineConfig } from './config.js';

export type {
  UserConfig,

  // Expose for dynamic mock.
  Request,
  Response,
};
export { defineConfig };
export * from './test/index.js';
