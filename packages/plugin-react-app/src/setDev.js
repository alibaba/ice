const chalk = require('chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const openBrowser = require('react-dev-utils/openBrowser');
const getMiniappOutputPath = require('./utils/getMiniappOutputPath');
const logWebpackConfig = require('./utils/logWebpackConfig');
const { MINIAPP, WECHAT_MINIPROGRAM} = require('./constants');

module.exports = (api, opts) => {
  const { onHook, context, getValue } = api;
  const { commandArgs } = context;
  const { targets, isMiniapp } = opts;

  onHook('before.start.run', ({ config }) => {
    logWebpackConfig(config);
  });

  onHook('after.start.compile', ({ urls, stats }) => {
    const serverPath = getValue('SERVER_PATH') || '';
    const statsJson = stats.toJson({
      all: false,
      errors: true,
      warnings: true,
      timings: true,
    });
    // compatible with webpack 5
    ['errors', 'warnings'].forEach((jsonKey) => {
      statsJson[jsonKey] = (statsJson[jsonKey] || []).map((item) => (item.message || item));
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
        if (process.env.CLOUDIDE_ENV) {
          console.log('   - IDE server: ', `https://${process.env.WORKSPACE_UUID}-${commandArgs.port}.${process.env.WORKSPACE_HOST}`);
        } else {
          console.log('   - Local  : ', chalk.underline.white(getLocalUrl(urls.localUrlForBrowser, serverPath)));
          console.log('   - Network: ', chalk.underline.white(getLocalUrl(urls.lanUrlForTerminal, serverPath)));
        }
        console.log();
      }
    }
  });

  // open browser on server start
  if (!commandArgs.disableOpen && !isMiniapp) {
    onHook('after.start.devServer', ({ url }) => {
      const serverPath = getValue('SERVER_PATH') || '';
      // do not open browser when restart dev
      if (!process.env.RESTART_DEV) openBrowser(getLocalUrl(url, serverPath));
    });
  }
};

function getLocalUrl(url, serverPath) {
  // lanUrlForTerminal returns undefined url when config host
  return serverPath && url ? `${url}${serverPath}` : url;
}
