/* eslint-disable import/no-dynamic-require, global-require */
const path = require('path');
const { getWebpackConfig, getJestConfig } = require('build-scripts-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const openBrowser = require('react-dev-utils/openBrowser');
const defaultConfig = require('./config/default.config');
const validation = require('./config/validation');
const optionConfig = require('./config/option.config');
const getFilePath = require('./utils/getFilePath');
const collect = require('./utils/collect');

module.exports = ({
  onGetWebpackConfig,
  onGetJestConfig,
  context,
  registerTask,
  registerUserConfig,
  registerCliOption,
  modifyUserConfig,
  onHook,
  log,
}) => {
  const { command, rootDir, webpack, commandArgs, pkg } = context;
  const appMode = commandArgs.mode || command;
  collect({ command, log, rootDir, pkg });
  modifyUserConfig((userConfig) => {
    const { modeConfig = {} } = userConfig;
    return modeConfig[appMode] || {};
  });
  // register user config without configWebpack
  registerUserConfig({
    name: 'modeConfig',
    validation: 'object',
    defaultValue: {},
  });

  // modify user config to keep excute order
  modifyUserConfig((userConfig) => {
    const configKeys = [...Object.keys(userConfig), 'filename'].sort();
    const newConfig = {};
    configKeys.forEach((configKey) => {
      if (configKey !== 'plugins') {
        newConfig[configKey] = Object.prototype.hasOwnProperty.call(userConfig, configKey)
          ? userConfig[configKey]
          : defaultConfig[configKey];;
        // eslint-disable-next-line no-param-reassign
        delete userConfig[configKey];
      }
    });
    return newConfig;
  });

  const mode = command === 'start' ? 'development' : 'production';
  const config = getWebpackConfig(mode);
  // setup DefinePlugin, HtmlWebpackPlugin and  CopyWebpackPlugin out of onGetWebpackConfig
  // in case of registerUserConfig will be excute before onGetWebpackConfig

  // DefinePlugin
  const defineVariables = {
    'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
    'process.env.APP_MODE': JSON.stringify(appMode),
    'process.env.SERVER_PORT': JSON.stringify(commandArgs.port),
  };
  config
    .plugin('DefinePlugin')
      .use(webpack.DefinePlugin, [defineVariables])
      .end()
    // HtmlWebpackPlugin
    .plugin('HtmlWebpackPlugin')
        .use(HtmlWebpackPlugin, [{
          inject: true,
          templateParameters: {
            NODE_ENV: process.env.NODE_ENV,
          },
          favicon: getFilePath([
            path.join(rootDir, 'public/favicon.ico'),
            path.join(rootDir, 'public/favicon.png'),
          ]),
          template: path.resolve(rootDir, 'public/index.html'),
          minify: false,
        }])
        .end()
    // CopyWebpackPlugin
    .plugin('CopyWebpackPlugin')
      .use(CopyWebpackPlugin, [[
        {
          from: path.resolve(rootDir, 'public'),
          to: path.resolve(rootDir, defaultConfig.outputDir),
          ignore: ['index.html'],
        },
      ]]);
  if (mode === 'development') {
    // set hot reload plugin
    config.plugin('HotModuleReplacementPlugin')
      .use(webpack.HotModuleReplacementPlugin);
  }
  registerTask('web', config);

  // sort config key to make sure entry config is always excute before injectBabel
  const configKeys = Object.keys(defaultConfig).sort();
  // register user config
  registerUserConfig(configKeys.map((configKey) => {
    let configFunc = null;
    let configValidation = null;
    try {
      configFunc = require(`./userConfig/${configKey}`);
      configValidation = validation[configKey];
    } catch (err) {
      log.error(err);
    }
    if (configFunc && configValidation) {
      return {
        name: configKey,
        validation: configValidation,
        configWebpack: configFunc,
        defaultValue: defaultConfig[configKey],
      };
    }
    return false;
  }).filter(Boolean));

  // register cli option
  const optionKeys = Object.keys(optionConfig);
  registerCliOption(optionKeys.map((optionKey) => {
    const { module, commands } = optionConfig[optionKey];
    const moduleName = module || optionKey;
    const optionDefination = {
      name: optionKey,
      commands,
    };
    if (module !== false) {
      try {
        optionDefination.configWebpack = require(`./cliOption/${moduleName}`);
      } catch (err) {
        log.error(err);
      }
    }
    return optionDefination;
  }));

  onGetWebpackConfig((chainConfig) => {
    // add resolve modules of project node_modules
    chainConfig.resolve.modules.add(path.join(rootDir, 'node_modules'));
  });

  if (command === 'test') {
    // jest config
    onGetJestConfig((jestConfig) => {
      const { moduleNameMapper, ...rest } = jestConfig;
      const defaultJestConfig = getJestConfig({ rootDir, moduleNameMapper });
      return {
        ...defaultJestConfig,
        ...rest,
        // defaultJestConfig.moduleNameMapper already combine jestConfig.moduleNameMapper
        moduleNameMapper: defaultJestConfig.moduleNameMapper,
      };
    });
  }

  // open browser on server start
  if (!commandArgs.disableOpen) {
    onHook('after.start.devServer', ({ url }) => {
      // do not open browser when restart dev
      if (!process.env.RESTART_DEV) openBrowser(url);
    });
  }
};
