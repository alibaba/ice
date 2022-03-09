const path = require('path');
const { applyCliOption, applyUserConfig, getEnhancedWebpackConfig } = require('@builder/user-config');
const getWebpackConfig = require('@builder/webpack-config').default;
const getCustomConfigs = require('./config');
const setBase = require('./setBase');
const setDev = require('./setDev');
const setBuild = require('./setBuild');
const setTest = require('./setTest');
const remoteRuntime = require('./userConfig/remoteRuntime').default;
const getInvalidMessage = require('./validateViteConfig').default;

module.exports = async (api) => {
  const { onGetWebpackConfig, context, registerTask, getValue, modifyUserConfig, log } = api;
  const { command, rootDir, userConfig, originalUserConfig } = context;
  const mode = command === 'start' ? 'development' : 'production';
  const iceTempPath = getValue('TEMP_PATH');

  const invalidMsg = getInvalidMessage(originalUserConfig);
  if (invalidMsg) {
    log.info(invalidMsg);
  }

  if (userConfig.vitePlugins && userConfig.vite) {
    // transform vitePlugins to vite.plugins
    modifyUserConfig('vite.plugins', userConfig.vitePlugins, { deepmerge: true });
  }
  
  // register cli option
  applyCliOption(api);

  // register user config
  applyUserConfig(api, { customConfigs: getCustomConfigs(userConfig) });

  // modify default babel config when jsx runtime is enabled
  if (getValue('HAS_JSX_RUNTIME')) {
    modifyUserConfig('babelPresets', (userConfig.babelPresets || []).concat([['@babel/preset-react', { runtime: 'automatic'}]]));
  }

  // modify minify options
  if (userConfig.swc && !Object.prototype.hasOwnProperty.call(originalUserConfig, 'minify')) {
    modifyUserConfig('minify', 'swc');
  }

  // set webpack config
  onGetWebpackConfig(chainConfig => {
    // add resolve modules of project node_modules
    chainConfig.resolve.modules.add(path.join(rootDir, 'node_modules'));
    if (iceTempPath) {
      chainConfig.resolve.alias.set('$ice/ErrorBoundary', path.join(iceTempPath, 'core' ,'ErrorBoundary'));
    }

    if (!process.env.CDN_PATH) {
      let publicPath = chainConfig.output.get('publicPath');
      // add last slash
      if (publicPath && !publicPath.endsWith('/')) {
        publicPath = `${publicPath}/`;
      }
      // process.env.CDN_PATH may defined by other plugins
      process.env.CDN_PATH = publicPath;
    }

    chainConfig.plugin('DefinePlugin').tap((args) => [
      Object.assign({}, ...args, {
        // keep the same name in build-plugin-def
        'process.env.CDN_PATH': JSON.stringify(process.env.CDN_PATH),
      }),
    ]);
    if (chainConfig.plugins.get('HtmlWebpackPlugin')) {
      chainConfig.plugin('HtmlWebpackPlugin').tap(([args]) => {
        args.templateParameters = {
          ...(args.templateParameters || {}),
          CDN_PATH: process.env.CDN_PATH,
        };
        return [args];
      });
    }
  });

  const taskName = 'web';
  const webpackConfig = getWebpackConfig(mode);
  const enhancedWebpackConfig = getEnhancedWebpackConfig(api, { webpackConfig });
  enhancedWebpackConfig.name(taskName);
  setBase(api, { webpackConfig: enhancedWebpackConfig });
  registerTask(taskName, enhancedWebpackConfig);

  if (command === 'start') {
    setDev(api);
  }

  if (command === 'build') {
    setBuild(api);
  }

  if (command === 'test') {
    setTest(api);
  }

  if (userConfig.remoteRuntime) {
    await remoteRuntime(api, userConfig.remoteRuntime);
  }
};
