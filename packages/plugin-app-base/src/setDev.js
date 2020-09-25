const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const openBrowser = require('react-dev-utils/openBrowser');
const chalk = require('chalk');
const { getOutputPath } = require('miniapp-builder-shared');
const qrcode = require('qrcode-terminal');

const {
  MINIAPP,
  WEB,
  WECHAT_MINIPROGRAM,
  BYTEDANCE_MICROAPP,
  WEEX,
  KRAKEN,
} = require('./constants');

module.exports = function(api) {
  // eslint-disable-next-line global-require
  const debug = require('debug')('rax-app');
  const { context, onHook } = api;
  const { commandArgs, userConfig } = context;
  const { targets } = userConfig;

  onHook('before.start.run', ({ config }) => {
    try {
      debug(config[0]);
    // eslint-disable-next-line no-empty
    } catch (err) {}
  });

  onHook('after.start.compile', async({ urls, stats, err }) => {
    const statsJson = stats.toJson({
      all: false,
      errors: true,
      warnings: true,
      timings: true,
    });
    const messages = formatWebpackMessages(statsJson);
    // Do not print localUrl and assets information when containing an error
    const isSuccessful = !messages.errors.length;

    if (isSuccessful) {
      console.log(chalk.green(' Starting the development server at:'));
      console.log();

      if (commandArgs.disableAssets === false) {
        console.log(
          stats.toString({
            errors: false,
            warnings: false,
            colors: true,
            assets: true,
            chunks: false,
            entrypoints: false,
            modules: false,
            timings: false,
          })
        );
      }

      if (targets.includes(MINIAPP)) {
        console.log(
          chalk.green(
            '  [Alibaba Miniapp] Use ali miniapp developer tools to open the following folder:'
          )
        );
        console.log(
          '   ',
          chalk.underline.white(getOutputPath(context, MINIAPP))
        );
        console.log();
      }

      if (targets.includes(WECHAT_MINIPROGRAM)) {
        console.log(
          chalk.green(
            '  [WeChat MiniProgram] Use wechat miniprogram developer tools to open the following folder:'
          )
        );
        console.log(
          '   ',
          chalk.underline.white(getOutputPath(context, WECHAT_MINIPROGRAM))
        );
        console.log();
      }

      if (targets.includes(BYTEDANCE_MICROAPP)) {
        console.log(
          chalk.green(
            '  [Bytedance Microapp] Use bytedance microapp developer tools to open the following folder:'
          )
        );
        console.log(
          '   ',
          chalk.underline.white(getOutputPath(context, BYTEDANCE_MICROAPP))
        );
        console.log();
      }
      if (targets.includes(WEB)) {
        console.log(
          '  [Web] Development Local server at: ',
          chalk.underline.white(getLocalUrl(urls.localUrlForBrowser))
        );
        console.log(
          '  [Web] Development Network server at: ',
          chalk.underline.white(getLocalUrl(urls.lanUrlForBrowser))
        );
        console.log();
      }

      if (targets.includes(KRAKEN)) {
        const krakenURL = `${urls.localUrlForBrowser  }kraken/index.js`;
        console.log(
          '  [Kraken] Development server at: ',
          chalk.underline.white(krakenURL)
        );
        console.log(
          '  [Kraken] Run Kraken Playground App:',
          chalk.underline.white(`kraken -u ${krakenURL}`)
        );
        console.log();
      }

      if (targets.includes(WEEX)) {
        // Use Weex App to scan ip address (mobile phone can't visit localhost).
        const weexUrl = `${urls.lanUrlForBrowser}weex/index.js?wh_weex=true`;
        console.log(
          '  [Weex] Development server at: ',
          chalk.underline.white(weexUrl)
        );
        console.log();
        qrcode.generate(weexUrl, { small: true });
        console.log();
      }
    }
  });

  if (!commandArgs.disableOpen && targets.includes[WEB]) {
    onHook('after.start.devServer', ({ url }) => {
      // do not open browser when restart dev
      if (!process.env.RESTART_DEV) openBrowser(getLocalUrl(url));
    });
  }
};

function getLocalUrl(url, entryHtml) {
  return entryHtml ? `${url}${entryHtml}` : url;
}
