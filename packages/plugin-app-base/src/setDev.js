const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const openBrowser = require('react-dev-utils/openBrowser');
const chalk = require('chalk');
const qrcode = require('qrcode-terminal');
const path = require('path');

const {
  MINIAPP,
  WEB,
  WECHAT_MINIPROGRAM,
  BYTEDANCE_MICROAPP,
  WEEX,
  KRAKEN,
} = require('./constants');

const highlightPrint = chalk.hex('#F4AF3D');

module.exports = function(api) {
  // eslint-disable-next-line global-require
  const debug = require('debug')('rax-app');
  const { context, onHook } = api;
  const { commandArgs, userConfig, rootDir } = context;
  const { targets } = userConfig;
  let webEntryKeys = [];
  let weexEntryKeys = [];
  const getWebpackEntry = (configs, configName) => {
    const taskConfig = configs.find((webpackConfig) => webpackConfig.name === configName);
    if (!taskConfig || !taskConfig.entry) {
      return {};
    }
    return taskConfig.entry;
  };
  onHook('before.start.run', ({ config }) => {
    webEntryKeys = Object.keys(getWebpackEntry(config, 'web'));
    weexEntryKeys = Object.keys(getWebpackEntry(config, 'weex'));
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
    const { outputDir = 'build' } = userConfig;


    if (isSuccessful) {
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
          highlightPrint(
            '  [Alibaba Miniapp] Use ali miniapp developer tools to open the following folder:'
          )
        );
        console.log(
          '   ',
          chalk.underline.white(path.resolve(rootDir, outputDir, MINIAPP))
        );
        console.log();
      }

      if (targets.includes(WECHAT_MINIPROGRAM)) {
        console.log(
          highlightPrint(
            '  [WeChat MiniProgram] Use wechat miniprogram developer tools to open the following folder:'
          )
        );
        console.log(
          '   ',
          chalk.underline.white(path.resolve(rootDir, outputDir, WECHAT_MINIPROGRAM))
        );
        console.log();
      }

      if (targets.includes(BYTEDANCE_MICROAPP)) {
        console.log(
          highlightPrint(
            '  [Bytedance Microapp] Use bytedance microapp developer tools to open the following folder:'
          )
        );
        console.log(
          '   ',
          chalk.underline.white(path.resolve(rootDir, outputDir, BYTEDANCE_MICROAPP))
        );
        console.log();
      }
      if (targets.includes(WEB)) {
        console.log(highlightPrint('  [Web] Development server at: '));
        webEntryKeys.forEach((entryKey) => {
          const entryPath = webEntryKeys.length > 1 ? `${entryKey}.html` : '';
          console.log(`  ${chalk.underline.white(`${getLocalUrl(urls.localUrlForBrowser)}${entryPath}`)}`);
          console.log(`  ${chalk.underline.white(`${getLocalUrl(urls.lanUrlForBrowser)}${entryPath}`)}`);
          console.log();
        });
      }

      if (targets.includes(KRAKEN)) {
        const krakenURL = `${urls.localUrlForBrowser  }kraken/index.js`;
        console.log(highlightPrint('  [Kraken] Development server at: '));
        console.log(`  ${chalk.underline.white(krakenURL)}`);
        console.log();
        console.log(highlightPrint('  [Kraken] Run Kraken Playground App: '));
        console.log(`  ${chalk.underline.white(`kraken -u ${krakenURL}`)}`);
        console.log();
      }

      if (targets.includes(WEEX)) {
        // Use Weex App to scan ip address (mobile phone can't visit localhost).
        console.log(highlightPrint('  [Weex] Development server at: '));
        weexEntryKeys.forEach((entryKey) => {
          const weexUrl = `${urls.lanUrlForBrowser}weex/${weexEntryKeys.length > 1 ? entryKey : 'index'}.js?wh_weex=true`;
          console.log(`  ${chalk.underline.white(weexUrl)}`);
          console.log();
          qrcode.generate(weexUrl, { small: true });
          console.log();
        });
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
