import path from 'path';
import { createRequire } from 'module';
import assert from 'assert';
import fg from 'fast-glob';
import { register } from 'esbuild-register/dist/node.js';

const require = createRequire(import.meta.url);

export const VALID_METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
];
export const DEFAULT_METHOD = 'GET';
export const MOCK_FILE_PATTERN = 'mock/**/*.{js,ts}';

export interface MockConfig {
  method: string;
  path: string;
  handler: Function | Record<string, any>;
}

export default function getConfigs(rootDir: string, exclude: string[] = []): MockConfig[] {
  // exclude is relative `mock` dir
  const ignore = exclude.map((ele) => `mock${ele.startsWith('/') ? '' : '/'}${ele}`);
  const mockFiles = fg.sync(MOCK_FILE_PATTERN, {
    cwd: rootDir,
    ignore,
  }).map(file => path.join(rootDir, file));

  const { unregister } = register({
    target: ['node12.19.0'],
    hookIgnoreNodeModules: true,
  });

  const mockConfigs: MockConfig[] = [];
  mockFiles.forEach(mockFile => {
    // disable require cache
    delete require.cache[mockFile];

    const mockModule = require(mockFile);
    const config = mockModule.default || mockModule || {};
    for (const key of Object.keys(config)) {
      const { method, path } = parseMockKey(key);
      const handler = config[key];
      assert(
        typeof handler === 'function' ||
          typeof handler === 'object' ||
          typeof handler === 'string',
        `mock value of ${key} should be function or object or string, but got ${typeof handler}`,
      );
      mockConfigs.push({
        method,
        path,
        handler,
      });
    }
  });

  unregister();

  return mockConfigs;
}

function parseMockKey(key: string) {
  const keyItems = key.split(/\s+/);
  if (keyItems.length === 1) {
    return {
      method: DEFAULT_METHOD,
      path: keyItems[0],
    };
  } else {
    const [method, path] = keyItems;
    const upperCaseMethod = method.toLocaleUpperCase();
    assert(
      VALID_METHODS.includes(upperCaseMethod),
      `method ${method} is not supported`,
    );
    assert(
      path,
      `${key} path is not defined`,
    );
    return {
      method,
      path,
    };
  }
}
