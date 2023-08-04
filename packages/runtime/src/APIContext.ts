import type { APIContext, APIContextConfig, APIContextOptions } from './types.js';

export function defineAPIContext(apiContext: APIContext, options?: APIContextOptions): APIContextConfig {
  const {
    timeout,
  } = options || {};

  return {
    apiContext,
    timeout,
  };
}