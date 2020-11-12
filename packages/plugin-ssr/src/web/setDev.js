module.exports = (config) => {
  const allEntries = config.entryPoints.entries();
  // eslint-disable-next-line
  for (const entryName in allEntries) {
    if (Object.prototype.hasOwnProperty.call(allEntries, entryName)) {
      // remove hmrClient
      config.entry(entryName).delete(require.resolve('react-dev-utils/webpackHotDevClient'));
    }
  }

  config.devServer.delete('before');

  return config;
};
