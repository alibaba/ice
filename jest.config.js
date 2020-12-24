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
  'preset': 'ts-jest'
};
