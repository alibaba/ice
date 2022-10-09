import * as path from 'path';
import { fileURLToPath } from 'url';
import { expect, it, describe, vi, beforeAll } from 'vitest';
import { defineJestConfig } from '../src/test';

const __dirname = fileURLToPath(path.dirname(import.meta.url));

describe('defineJestConfig', () => {
  beforeAll(() => {
    const spy = vi.spyOn(process, 'cwd');
    spy.mockReturnValue(path.join(__dirname, '../../../examples/with-jest'));
  });

  it('get default config with object', async () => {
    const jestConfigFn = defineJestConfig({});
    const jestConfig = await jestConfigFn();
    expect(Object.keys(jestConfig)).toStrictEqual(['moduleNameMapper']);
    expect(Object.keys(jestConfig.moduleNameMapper as Record<string, string>)).toStrictEqual(['^ice', '^@/(.*)', '^webpack/hot', '^regenerator-runtime']);
  });

  it('get default config with function', async () => {
    const jestConfigFn = defineJestConfig(async () => { return {}; });
    const jestConfig = await jestConfigFn();
    expect(Object.keys(jestConfig)).toStrictEqual(['moduleNameMapper']);
    expect(Object.keys(jestConfig.moduleNameMapper as Record<string, string>)).toStrictEqual(['^ice', '^@/(.*)', '^webpack/hot', '^regenerator-runtime']);
  });

  it('get config with custom object config', async () => {
    const jestConfigFn = defineJestConfig({ testTimeout: 12000 });
    const jestConfig = await jestConfigFn();
    expect(Object.keys(jestConfig)).toStrictEqual(['moduleNameMapper', 'testTimeout']);
  });

  it('get config with custom function config', async () => {
    const jestConfigFn = defineJestConfig(async () => { return { testTimeout: 12000 }; });
    const jestConfig = await jestConfigFn();
    expect(Object.keys(jestConfig)).toStrictEqual(['moduleNameMapper', 'testTimeout']);
  });
});
