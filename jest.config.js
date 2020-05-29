module.exports = {
  'collectCoverage': true,
  'verbose': true,
  'preset': 'ts-jest',
  'coverageDirectory': './coverage/',
  'roots': [
    '<rootDir>/packages',
  ],
  'testPathIgnorePatterns': [
    '/node_modules/',
    '/lib/',
    'icejs/bin/'
  ]
};
