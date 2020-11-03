const path = require('path');
const { getJestConfig } = require('build-scripts-config');
const { applyCliOption, applyUserConfig, getWebpackBase } = require('build-webpack-config');
const openBrowser = require('react-dev-utils/openBrowser');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const chalk = require('chalk');
const debug = require('debug')('icejs');
const getMiniappOutputPath = require('./utils/getMiniappOutputPath');
const getWebOutputPath = require('./utils/getWebOutputPath');
const { WEB, MINIAPP, WECHAT_MINIPROGRAM} = require('./constants');

module.exports = (api) => {
  const { onGetJestConfig, onGetWebpackConfig, context, registerTask, onHook } = api;
  const { command, rootDir, commandArgs, userConfig } = context;
  const { targets = [WEB], mpa } = userConfig;
  const isMiniapp = targets.includes(MINIAPP) || targets.includes(WECHAT_MINIPROGRAM);

  // open the specified html in MPA mode
  let entryHtml;
  if (mpa) {
    if (commandArgs.mpaEntry) {
      const arr = commandArgs.mpaEntry.split(',');
      const pageName = arr[0].toLocaleLowerCase();
      entryHtml = `${pageName}.html`;
    } else {
      onGetWebpackConfig(config => {
        const defaultEntryNames = Object.keys(config.entryPoints.entries());
        let pageName = '';
        if (typeof mpa.openPage === 'string') {
          pageName = mpa.openPage.split('.html')[0];
        } else {
          pageName = defaultEntryNames[0];
        }
        entryHtml = pageName ? `${pageName.toLocaleLowerCase()}.html` : '';
      });
    }
  }

  // register cli option
  applyCliOption(api);

  // register user config
  applyUserConfig(api);

  // set webpack config
  onGetWebpackConfig((chainConfig) => {
    // add resolve modules of project node_modules
    chainConfig.resolve.modules.add(path.join(rootDir, 'node_modules'));
  });

  targets.forEach(target => {
    // compatible with old logic，not set target
    // output：build/*
    if (target === WEB && !userConfig.targets) {
      target = '';
    }
    registerTask(target, getWebpackBase(api, { isMiniapp, target }));
  });

  if (command === 'test') {
    onHook('before.test.run', ({ config }) => {
      logWebpackConfig(config);
    });

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
    onHook('before.start.run', ({ config }) => {
      logWebpackConfig(config);
    });

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
          console.log('   - Local  : ', chalk.underline.white(getLocalUrl(urls.localUrlForBrowser, entryHtml)));
          console.log('   - Network: ', chalk.underline.white(getLocalUrl(urls.lanUrlForTerminal, entryHtml)));
          console.log();
        }
      }
    });
  }

  if (command === 'build') {
    onHook('before.build.run', ({ config }) => {
      logWebpackConfig(config);
    });

    targets.forEach((target) => {
      onGetWebpackConfig(target, (config) => {
        const outputPath = getWebOutputPath(context, { target });
        config.output.path(outputPath);
      });
    });
  }

  // open browser on server start
  if (!commandArgs.disableOpen && !isMiniapp) {
    onHook('after.start.devServer', ({ url }) => {
      // do not open browser when restart dev
      if (!process.env.RESTART_DEV) openBrowser(getLocalUrl(url, entryHtml));
    });
  }
};

function getLocalUrl(url, entryHtml) {
  return entryHtml ? `${url}${entryHtml}` : url;
}

function logWebpackConfig(config) {
  try {
    const tmp = [];
    debug(JSON.stringify(config, function(key, val) {
      if (val != null && typeof val === 'object') {
        if (tmp.indexOf(val) >= 0) {
          return;
        }
        tmp.push(val);
      }
      return val;
    }, 2));
  } catch (error) {
    // ignore error
  }
}
