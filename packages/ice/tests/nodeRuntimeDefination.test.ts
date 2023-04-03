import { expect, it, describe } from 'vitest';
import { getRuntimeDefinition } from '../src/service/serverCompiler';

describe('Get node runtime definition', () => {
  it('basic', () => {
    const define = getRuntimeDefinition({
      'process.env.ROUTER_BASE_NAME': JSON.stringify('/'),
      'process.env.WEB_APP': true,
    });
    expect(define).toEqual({
      '__process.env.ICE_CORE_DEV_PORT__': '"undefined"',
      '__process.env.ICE_CORE_ERROR_BOUNDARY__': '"false"',
      '__process.env.ICE_CORE_INITIAL_DATA__': '"true"',
      '__process.env.ICE_CORE_MODE__': '"undefined"',
      '__process.env.ICE_CORE_ROUTER__': '"true"',
      '__process.env.ICE_CORE_SSG__': '"false"',
      '__process.env.ICE_CORE_SSR__': '"false"',
      'process.env.ROUTER_BASE_NAME': '"/"',
      'process.env.WEB_APP': 'true',
    });
  });
});
