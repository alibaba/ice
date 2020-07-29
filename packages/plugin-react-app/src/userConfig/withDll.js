const path = require('path');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = (chainConfig, withDll, { userConfig, rootDir, webpack }) => {
  const { dll } = userConfig;
  // if both dll and withDll are true, use dll
  if (dll) return;
  
  if(!withDll) return;

  // use generated dll
  const { dllEntry } = userConfig;
  const entryKeys = Object.keys(dllEntry);
  entryKeys.forEach(entryKey => {
    chainConfig.plugin(`DllReferencePlugin_${entryKey}`).use(webpack.DllReferencePlugin, [{
      manifest: path.resolve(rootDir, 'dll', `${entryKey}.manifest.json`)
    }]);
  });

  chainConfig.plugin('AddAssetHtmlPlugin').use(AddAssetHtmlPlugin, [{
    filepath: path.resolve(rootDir, 'dll', '*.dll.js')
  }]).after('HtmlWebpackPlugin');
};
