import * as path from 'path';
import * as fse from 'fs-extra';
import { IPluginAPI } from 'build-scripts';

export default (api: IPluginAPI, { remoteName, bootstrap, remoteEntry, compilePackages, runtimeDir }) => {
  const { context, getValue, modifyUserConfig, onGetWebpackConfig } = api;
  const { rootDir } = context;
  const runtimePublicPath = 'remoteRuntime';
  // create bootstrap for main app
  let bootstrapEntry = '';
  if (!bootstrap) {
    bootstrapEntry = path.join(getValue('TEMP_PATH'), 'bootstrap.ts');
    fse.writeFileSync(bootstrapEntry, 'import(\'../src/app\')', 'utf-8');
  } else {
    bootstrapEntry = path.isAbsolute(bootstrap) ? bootstrap : path.join(rootDir, bootstrap);
  }

  // config moduleFederation
  modifyUserConfig((modifyConfig) => {
    const remotePlugins = [[require.resolve('./babelPluginRemote'), { libs: compilePackages, remoteName }]];
    return {
      babelPlugins: Array.isArray(modifyConfig.babelPlugins) ? modifyConfig.babelPlugins.concat(remotePlugins) : remotePlugins,
      moduleFederation: {
        name: 'app',
        remotes: { [remoteName]: `${remoteName}@/${runtimePublicPath}/${remoteEntry}` },
        shared: [
          'react',
          'react-dom',
          'react-router',
          'react-router-dom',
        ],
      },
      sourceDir: 'src',
    };
  });

  onGetWebpackConfig((config) => {
    config.plugin('CopyWebpackPlugin').tap(([{ patterns, ...restOptions }]) => {
      return [{
        patterns: [
          ...patterns,
          // serve remoteRuntime folder
          { from: runtimeDir, to: path.join(patterns[0].to, runtimePublicPath) },
        ],
        ...restOptions,
      }];
    });
    // modify entry by onGetWebpackConfig while polyfill will take effect with src/app
    // config.entryPoints.clear();
    config.entry('index').values().forEach((entry) => {
      // compatible with entry path in win32
      if (entry.split(path.sep).join('/').match(/\/src\/app/)) {
        config.entry('index').delete(entry);
      }
    });
    config.entry('index').add(bootstrapEntry);
    // eslint-disable-next-line global-require
    const AddAssetHtmlPlugin = require('@builder/pack/deps/add-asset-html-webpack-plugin');
    config.plugin('AddAssetHtmlPlugin').use(AddAssetHtmlPlugin, [{
      filepath: path.resolve(runtimeDir, remoteEntry),
      publicPath: `/${runtimePublicPath}`,
    }]).after('HtmlWebpackPlugin');
    // remove 404 htmlWebpackPlugin while AddAssetHtmlPlugin occurs errors with multi HtmlWebpackPlugin
    config.plugins.delete('HtmlWebpackPlugin_404');
  });
};
