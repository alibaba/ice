import { IUserConfig } from '@alib/build-scripts';

interface IPluginOptions {
  themePackage?: string | object
}

function analyzeNext(userConfig: IUserConfig, searchPath) {
  let nextCSSPath = require.resolve('@alifd/next/dist/next.css', {paths: [searchPath]});
  let removePackage = null;
  // check theme package
  const pluginInfo = userConfig.plugins.find((plugin) => plugin[0] === 'build-plugin-fusion');
  if (pluginInfo) {
    const [, pluginOptions] = pluginInfo as [string, IPluginOptions];
    if (pluginOptions.themePackage) {
      if (typeof pluginOptions.themePackage === 'string') {
        nextCSSPath = require.resolve(`${pluginOptions.themePackage}/dist/next.css`, {paths: [searchPath]});
        removePackage = pluginOptions.themePackage;
      } else {
        // compile next style while th
        removePackage = '@alifd/next';
        nextCSSPath = '';
      }
    }
  }
  return [nextCSSPath, removePackage];
}

export default analyzeNext;