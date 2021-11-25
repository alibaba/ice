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
  'projects': [
    {
        'testMatch': ['<rootDir>/packages/plugin-router/tests/**/*.(spec|test).*'],
        'displayName': { 'name': 'PluginRouter', 'color': 'cyan' },
        'testEnvironment': 'node',
        'transform': {
          '^.+\\.jsx?$': 'babel-jest',
          '^.+\\.tsx?$': 'ts-jest'
        },
        'globals': {
            'ts-jest': {
                'tsconfig': '<rootDir>/packages/plugin-router/tsconfig.json',
            },
        },
    },
    {
        'testMatch': [ '**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)' ],
        'displayName': { 'name': 'Others', 'color': 'blue' },
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
          'create-cli-utils/',
          'plugin-router/'
        ],
    },
],
};
