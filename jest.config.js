module.exports = {
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
    'create-cli-utils/'
  ],
  'moduleDirectories': ['node_modules'],
  'moduleNameMapper': {
    '^@@locked/axios$': 'axios',
    '^@@locked/axios/lib/utils$': 'axios/lib/utils'
  },
  // copy from jest config
  'testMatch': [ '**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)' ],
  'preset': 'ts-jest'
};
