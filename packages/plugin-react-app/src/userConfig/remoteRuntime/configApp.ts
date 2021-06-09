import * as path from 'path';
import * as fse from 'fs-extra';
import { IPluginAPI } from 'build-scripts';

export default (api: IPluginAPI, { remoteName, bootstrap, compilePackages, runtimeDir }) => {
  const { context, getValue, modifyUserConfig, onGetWebpackConfig } = api;
  const { rootDir } = context;
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
        remoteType: 'window',
        remotes: [remoteName],
      },
      sourceDir: 'src',
    };
  });

  onGetWebpackConfig((config) => {
    config.plugin('CopyWebpackPlugin').tap(([args]) => {
      // serve remoteRuntime folder
      return [[...args, { from: runtimeDir, to: path.join(args[0].to, 'remoteRuntime') }]];
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
  });
};
