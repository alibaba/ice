const chalk = require('chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const openBrowser = require('react-dev-utils/openBrowser');
const getMiniappOutputPath = require('./utils/getMiniappOutputPath');
const logWebpackConfig = require('./utils/logWebpackConfig');
const { MINIAPP, WECHAT_MINIPROGRAM} = require('./constants');

module.exports = (api, opts) => {
  const { onHook, context, onGetWebpackConfig } = api;
  const { commandArgs, userConfig: { mpa } } = context;
  const { targets, isMiniapp } = opts;

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
