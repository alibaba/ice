const path = require('path');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const chalk = require('chalk');
const {
  MINIAPP,
  WEB,
  WECHAT_MINIPROGRAM,
  BYTEDANCE_MICROAPP,
  WEEX,
  KRAKEN,
} = require('./constants');

const highlightPrint = chalk.hex('#F4AF3D');

module.exports = (api) => {
  // eslint-disable-next-line global-require
  const debug = require('debug')('rax-app');
  const { context, onHook } = api;
  const { rootDir, userConfig } = context;

  onHook('before.build.run', ({ config }) => {
    try {
      debug(config[0]);
    // eslint-disable-next-line no-empty
    } catch (err) {}
  });

  onHook('after.build.compile', ({ err, stats }) => {
    const statsJson = stats.toJson({
      all: false,
      errors: true,
      warnings: true,
      timings: true,
    });
    const messages = formatWebpackMessages(statsJson);
    // Do not print localUrl and assets information when containing an error
    const isSuccessful = !messages.errors.length;
    const { outputDir = 'build', targets } = userConfig;

    if (isSuccessful) {
      console.log(highlightPrint('Build finished:'));
      console.log();

      if (targets.includes(WEB)) {
        console.log(highlightPrint('[Web] Bundle at:'));
        console.log(
          '   ',
          chalk.underline.white(path.resolve(rootDir, outputDir, WEB))
        );
        console.log();
      }

      if (targets.includes(WEEX)) {
        console.log(highlightPrint('[Weex] Bundle at:'));
        console.log(
          '   ',
          chalk.underline.white(path.resolve(rootDir, outputDir, WEEX))
        );
        console.log();
      }

      if (targets.includes(KRAKEN)) {
        console.log(highlightPrint('[Kraken] Bundle at:'));
        console.log(
          '   ',
          chalk.underline.white(path.resolve(rootDir, outputDir, KRAKEN))
        );
        console.log();
      }

      if (targets.includes(MINIAPP)) {
        console.log(highlightPrint('[Alibaba MiniApp] Bundle at:'));
        console.log(
          '   ',
          chalk.underline.white(path.resolve(rootDir, outputDir, MINIAPP))
        );
        console.log();
      }

      if (targets.includes(WECHAT_MINIPROGRAM)) {
        console.log(highlightPrint('[WeChat MiniProgram] Bundle at:'));
        console.log(
          '   ',
          chalk.underline.white(path.resolve(rootDir, outputDir, WECHAT_MINIPROGRAM))
        );
        console.log();
      }

      if (targets.includes(BYTEDANCE_MICROAPP)) {
        console.log(highlightPrint('[ByteDance MicroApp] Bundle at:'));
        console.log(
          '   ',
          chalk.underline.white(path.resolve(rootDir, outputDir, BYTEDANCE_MICROAPP))
        );
        console.log();
      }
    }
  });
};
