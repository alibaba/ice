const path = require('path');

module.exports = (chainConfig, dll, { userConfig, rootDir }) => {
  if (!dll) return;
  
  // dll generation
  const { dllEntry } = userConfig;
  chainConfig.entryPoints.clear();
  const entryKeys = Object.keys(dllEntry);
  entryKeys.forEach(entryKey => {
    const entryValues = dllEntry[entryKey];
    entryValues.forEach(entryVal => {
      chainConfig.entry(entryKey).add(entryVal);
    });
  });

  chainConfig.output.path(path.join(rootDir, 'dll'));
  chainConfig.output.library('_dll_[name]');
  chainConfig.output.filename('[name].dll.js');
};
