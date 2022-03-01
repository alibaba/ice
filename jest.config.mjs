import { getHookFiles } from './packages/ice/lib/requireHook.js';

const moduleNameMapper = getHookFiles().reduce((mapper, [id, value]) => {
  mapper[`^${id}$`] = value;
  return mapper;
}, {});

export default {
  moduleNameMapper,
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: ['packages/*/lib/*.{js,jsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
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
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  globals: {
    'ts-jest': {
      // For ts-jest use rootDir's tsconfig.json, while unable to resolve references.
      // The following strategy maybe not the best, but it works.
      // https://github.com/kulshekhar/ts-jest/issues/1648
      tsconfig: 'tsconfig.base.json',
      useESM: true,
    },
  },
};
