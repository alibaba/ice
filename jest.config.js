const { getHookFiles } = require('./packages/ice/lib/requireHook');

const moduleNameMapper = getHookFiles().reduce((mapper, [id, value]) => {
  mapper[`^${id}$`] = value;
  return mapper;
}, {});

module.exports = {
  moduleNameMapper,
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: ['packages/*/lib/*.{js,jsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  // copy from jest config

  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  roots: [
    '<rootDir>/packages',
    '<rootDir>/test',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
    'create-cli-utils/',
  ],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  // For ts-jest use rootDir's tsconfig.json, while unable to resolve references.
  // The following strategy maybe not the best, but it works.
  // https://github.com/kulshekhar/ts-jest/issues/1648
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.base.json',
    },
  },
};
