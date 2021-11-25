const { getHookFiles } = require('./packages/icejs/lib/require-hook');

const moduleNameMapper = getHookFiles().reduce((mapper, [id, value]) => {
  mapper[`^${id}$`] = value;
  return mapper;
}, {});

module.exports = {
  moduleNameMapper,
  // 'testRunner': 'jest-circus/runner',
  'coverageDirectory': './coverage/',
  'collectCoverage': true,
  'collectCoverageFrom': ['packages/*/lib/*.{js,jsx}'],
  'coveragePathIgnorePatterns': [
    '<rootDir>/node_modules/'
  ],
  // copy from jest config

  'testEnvironment': 'node',
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
    'create-cli-utils/'
  ],
  'testMatch': [ '**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)' ],
  'globals': {
    'ts-jest': {
        'tsconfig': 'tsconfig.settings.json',
    },
  },
};
