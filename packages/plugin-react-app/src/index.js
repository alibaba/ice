const path = require('path');
const { getJestConfig } = require('build-scripts-config');
const openBrowser = require('react-dev-utils/openBrowser');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const chalk = require('chalk');
const registerCliOption = require('./registerCliOption');
const registerUserConfig = require('./registerUserConfig');
const modifyUserConfig = require('./modifyUserConfig');
const getBase = require('./base');
const getMiniappOutputPath = require('./utils/getMiniappOutputPath');
const { WEB, MINIAPP, WECHAT_MINIPROGRAM} = require('./constants');

module.exports = (api) => {
  const { onGetJestConfig, onGetWebpackConfig, context, registerTask, onHook } = api;
  const { command, rootDir, commandArgs, userConfig } = context;
  const { targets = [WEB] } = userConfig;
  const isMiniapp = Array.isArray(targets)
    && (targets.includes(MINIAPP) || targets.includes(WECHAT_MINIPROGRAM));

  // register cli option
  registerCliOption(api);

  // register user config
  registerUserConfig(api);

  // modify user config to keep excute order
  modifyUserConfig(api);

  // set webpack config
  onGetWebpackConfig((chainConfig) => {
    // add resolve modules of project node_modules
    chainConfig.resolve.modules.add(path.join(rootDir, 'node_modules'));
    if (userConfig.disableRuntime) {
      // alias for project src directory. compatible with disableRuntime enabled
      config.resolve.alias.set('@', path.join(rootDir, 'src'));
    }
  });

  targets.forEach(target => registerTask(target, getBase(api)));

  if (command === 'test') {
    onGetJestConfig((jestConfig) => {
      const { moduleNameMapper, ...rest } = jestConfig;

      Object.keys(moduleNameMapper).forEach(key => {
        // escape $ in the beginning. because $ match the end position end in regular expression
        // '^$ice/history$' -> '^\$ice/history$'
        if (key.indexOf('^$') === 0) {
          const newKey = `^\\${key.slice(1)}`;
          moduleNameMapper[newKey] = moduleNameMapper[key];
          delete moduleNameMapper[key];
        };
      });

      const defaultJestConfig = getJestConfig({ rootDir, moduleNameMapper });
      return {
        ...defaultJestConfig,
        ...rest,
        // defaultJestConfig.moduleNameMapper already combine jestConfig.moduleNameMapper
        moduleNameMapper: defaultJestConfig.moduleNameMapper,
      };
    });
  }

  if (command === 'start') {
    onHook('after.start.compile', ({ urls, stats }) => {
      const statsJson = stats.toJson({
        all: false,
        errors: true,
        warnings: true,
        timings: true,
      });
      const messages = formatWebpackMessages(statsJson);
      // 包含错误时不打印 localUrl 和 assets 信息
      const isSuccessful = !messages.errors.length;
      if (isSuccessful) {

        if (isMiniapp) {
          console.log(chalk.green(' Starting the development server at:'));
          console.log();

          if (targets.includes(MINIAPP)) {
            console.log(chalk.green('  [Ali Miniapp] Use ali miniapp developer tools to open the following folder:'));
            console.log('   ', chalk.underline.white(getMiniappOutputPath(context)));
            console.log();
          }

          if (targets.includes(WECHAT_MINIPROGRAM)) {
            console.log(chalk.green('  [WeChat MiniProgram] Use wechat miniprogram developer tools to open the following folder:'));
            console.log('   ', chalk.underline.white(getMiniappOutputPath(context, { target: WECHAT_MINIPROGRAM })));
            console.log();
          }
        }

        if (targets.includes('web')) {
          if (!commandArgs.disableAssets) {
            console.log(stats.toString({
              errors: false,
              warnings: false,
              colors: true,
              assets: true,
              chunks: false,
              entrypoints: false,
              modules: false,
              timings: false
            }));
          }

          console.log();
          console.log(chalk.green(' Starting the development server at:'));
          console.log('   - Local  : ', chalk.underline.white(urls.localUrlForBrowser));
          console.log('   - Network: ', chalk.underline.white(urls.lanUrlForTerminal));
          console.log();
        }
      }
    });
  }

  // open browser on server start
  if (!commandArgs.disableOpen && !isMiniapp) {
    onHook('after.start.devServer', ({ url }) => {
      // do not open browser when restart dev
      if (!process.env.RESTART_DEV) openBrowser(url);
    });
  }
};
