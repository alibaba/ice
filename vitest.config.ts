import { defineConfig } from 'vitest/config';
import { getHookFiles } from './packages/ice/esm/requireHook.js';

const moduleNameMapper = getHookFiles().reduce((mapper, [id, value]) => {
  mapper[`^${id}$`] = value;
  return mapper;
}, {});

export default defineConfig({
  resolve: {
    alias: { ...moduleNameMapper },
  },
  test: {
    testTimeout: 120000,
    hookTimeout: 120000,
    // To avoid error `Segmentation fault (core dumped)` in CI environment, disable threads
    // ref: https://github.com/vitest-dev/vitest/issues/317
    threads: false,
    exclude: [
      '**/node_modules/**',
      '**/esm/**',
      '**/tests/fixtures/**',
      'examples/**',
    ],
    coverage: {
      reporter: ['cobertura', 'text'],
      include: ['**/packages/**'],
      exclude: [
        '**/bundles/compiled/**',
        // App runtime has been tested by unit test case
        '**/packages/runtime/esm/**',
        '**/packages/route-manifest/esm/**',
        '**/packages/miniapp-runtime/esm/**',
        '**/tests/**',
      ],
    },
    environment: 'node',
  },
  mode: 'test',
});
