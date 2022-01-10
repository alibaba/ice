const knownListShouldIngoreTransform = ['[/\\\\]node_modules[/\\\\]core-js', '[/\\\\]node_modules[/\\\\]@swc[/\\\\]helpers', '[/\\\\]node_modules[/\\\\]@babel[/\\\\]runtime'];

export default ({rootDir = process.cwd(), regexForTestFiles = null, moduleNameMapper = {}, userJestConfig = {}} = {}) => {
  return {
    rootDir,
    setupFiles: [require.resolve('./shim.js')],
    testMatch: ['**/?*.(spec|test).(j|t)s?(x)'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': require.resolve('./babelTransform.js'),
      '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': require.resolve('./fileTransform.js'),
    },
    transformIgnorePatterns: [
      ...knownListShouldIngoreTransform,
      '^.+\\.module\\.(css|sass|scss|less)$',
    ],
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': require.resolve('identity-obj-proxy'),
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve('./fileMock.js'),
      ...moduleNameMapper,
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    testPathIgnorePatterns: ['/node_modules/'],
    ...userJestConfig,
    ...(regexForTestFiles ? { testMatch: regexForTestFiles } : {}),
  };
};
