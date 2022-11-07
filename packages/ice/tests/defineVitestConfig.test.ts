import * as path from 'path';
import { fileURLToPath } from 'url';
import { expect, it, describe, vi, beforeAll } from 'vitest';
import { defineVitestConfig } from '../src/test';

const __dirname = fileURLToPath(path.dirname(import.meta.url));

describe('defineVitestConfig', () => {
  const builtInAlias = [
    'ice',
    '@',
    'webpack/hot',
    'regenerator-runtime',
    '@swc/helpers',
    'core-js',
  ];
  beforeAll(() => {
    const spy = vi.spyOn(process, 'cwd');
    spy.mockReturnValue(path.join(__dirname, '../../../examples/with-vitest'));
  });

  it('get default config with object', async () => {
    const vitestConfigFn = defineVitestConfig({});
    const vitestConfig = await vitestConfigFn({ command: 'serve', mode: 'test' });
    expect(Object.keys(vitestConfig.resolve as Record<string, string>)).toStrictEqual(['alias']);
    expect(Object.keys(vitestConfig.resolve?.alias as Record<string, string>)).toStrictEqual(builtInAlias);
  });

  it('get default config with function', async () => {
    const vitestConfigFn = defineVitestConfig(() => ({}));
    const vitestConfig = await vitestConfigFn({ command: 'serve', mode: 'test' });
    expect(Object.keys(vitestConfig.resolve as Record<string, string>)).toStrictEqual(['alias']);
    expect(Object.keys(vitestConfig.resolve?.alias as Record<string, string>)).toStrictEqual(builtInAlias);
  });

  it('get config with custom object config', async () => {
    const vitestConfigFn = defineVitestConfig({ test: { testTimeout: 12000 } });
    const vitestConfig = await vitestConfigFn({ command: 'serve', mode: 'test' });
    expect(Object.keys(vitestConfig.resolve as Record<string, string>)).toStrictEqual(['alias']);
    expect(Object.keys(vitestConfig.test as Record<string, string>)).toStrictEqual(['testTimeout']);
  });

  it('get config with custom function config', async () => {
    const vitestConfigFn = defineVitestConfig(async () => ({ test: { testTimeout: 12000 } }));
    const vitestConfig = await vitestConfigFn({ command: 'serve', mode: 'test' });
    expect(Object.keys(vitestConfig.resolve as Record<string, string>)).toStrictEqual(['alias']);
    expect(Object.keys(vitestConfig.test as Record<string, string>)).toStrictEqual(['testTimeout']);
  });
});
