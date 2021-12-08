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
  const { applyMethod, onGetWebpackConfig, context, registerTask, getValue, modifyUserConfig, log, onHook } = api;
  const { command, commandArgs, rootDir, userConfig, originalUserConfig } = context;
  const mode = command === 'start' ? 'development' : 'production';
  const iceTempPath = getValue('TEMP_PATH');

  const invalidMsg = getInvalidMessage(originalUserConfig);
  if (invalidMsg) {
    log.info(invalidMsg);
  }

  if (userConfig.vitePlugins) {
    // transform vitePlugins to vite.plugins
    modifyUserConfig('vite.plugins', userConfig.vitePlugins, { deepmerge: true });
  }
  
  // register cli option
  applyCliOption(api, { customOptionConfig: {
    'build-speed': {
      module: false,
      commands: ['start', 'build'],
    }
  }});

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
  // add runtime plugin only --build-speed is configured in mode vite
  if (!commandArgs.buildSpeed || !userConfig.vite) {
    applyMethod('addDisableRuntimePlugin', 'build-plugin-react-app');
  }
  if (commandArgs.buildSpeed) {
    // eslint-disable-next-line global-require
    const SpeedMeasurePlugin = require('@builder/pack/deps/speed-measure-webpack-plugin');
    const smp = new SpeedMeasurePlugin({
      // https://github.com/stephencookdev/speed-measure-webpack-plugin/issues/167
      // ignore plugins with do not work properly with speed-measure-webpack-plugin
      ignorePlugins: ['MiniCssExtractPlugin'],
      loaderTopFiles: 10,
    });

    onHook(`before.${command}.load`, ({ webpackConfig: configArr }) => {
      configArr.forEach((item) => {
        const origConfig = item.chainConfig;
        const wrappedConfig = smp.wrap(origConfig.toConfig());
        item.chainConfig = new Proxy(origConfig, {
          get(target, property) {
            if (property === 'toConfig') {
              return () => wrappedConfig;
            }
            return target[property];
          },
        });
      });
    });
  }
};
