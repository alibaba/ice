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
  'roots': [
    '<rootDir>/packages',
    '<rootDir>/test',
  ],
  'testPathIgnorePatterns': [
    '/node_modules/',
    '/lib/',
    'create-cli-utils/',
  ],
  // copy from jest config
  'testMatch': [ '**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)' ],
  'preset': 'ts-jest'
};
