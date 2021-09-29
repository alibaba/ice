const { getHookFiles } = require('./packages/icejs/lib/require-hook');

const moduleNameMapper = getHookFiles().reduce((mapper, [id, value]) => {
  mapper[`^${id}$`] = value;
  return mapper;
}, {});

module.exports = {
  moduleNameMapper,
  // 'testRunner': 'jest-circus/runner',
  'coverageDirectory': './coverage/',
  'testEnvironment': 'node',
  'collectCoverage': true,
  'collectCoverageFrom': ['packages/*/lib/*.{js,jsx}'],
  'coveragePathIgnorePatterns': [
    '<rootDir>/node_modules/'
  ],
  'transform': {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  'roots': [
    '<rootDir>/packages',
    '<rootDir>/test',
  ],
  'testPathIgnorePatterns': [
    '/node_modules/',
    '/lib/',
    'create-cli-utils/',
    'test/basic-spa.test.ts',
    'test/basic-mpa.test.ts',
    'test/basic-keep-alive.test.ts',
    'test/basic-nested-store.test.ts',
    'test/basic-ssr-with-lazy-load.test.ts',
    'test/basic-ssr.test.ts',
  ],
  // copy from jest config
  'testMatch': [ '**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)' ],
};
