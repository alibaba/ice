const path = require('path');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const chalk = require('chalk');
const { getOutputPath } = require('miniapp-builder-shared');
const handleWebpackErr = require('./utils/handleWebpackErr');
const {
  MINIAPP,
  WEB,
  WECHAT_MINIPROGRAM,
  BYTEDANCE_MICROAPP,
  WEEX,
  KRAKEN,
} = require('./constants');

module.exports = (api) => {
  const debug = require('debug')('rax-app');
  const { context, onHook } = api;
  const { rootDir, userConfig } = context;
  const { outputDir = 'build', targets } = userConfig;

  onHook('before.build.run', ({ config }) => {
    try {
      debug(config[0]);
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

    if (isSuccessful) {
      console.log(chalk.green('Build finished:'));
      console.log();

      if (targets.includes(WEB)) {
        console.log(chalk.green('[Web] Bundle at:'));
        console.log(
          '   ',
          chalk.underline.white(path.resolve(rootDir, outputDir, WEB))
        );
        console.log();
      }

      if (targets.includes(WEEX)) {
        console.log(chalk.green('[Weex] Bundle at:'));
        console.log(
          '   ',
          chalk.underline.white(path.resolve(rootDir, outputDir, WEEX))
        );
        console.log();
      }

      if (targets.includes(KRAKEN)) {
        console.log(chalk.green('[Kraken] Bundle at:'));
        console.log(
          '   ',
          chalk.underline.white(path.resolve(rootDir, outputDir, KRAKEN))
        );
        console.log();
      }

      if (targets.includes(MINIAPP)) {
        console.log(chalk.green('[Alibaba MiniApp] Bundle at:'));
        console.log(
          '   ',
          chalk.underline.white(getOutputPath(context, MINIAPP))
        );
        console.log();
      }

      if (targets.includes(WECHAT_MINIPROGRAM)) {
        console.log(chalk.green('[WeChat MiniProgram] Bundle at:'));
        console.log(
          '   ',
          chalk.underline.white(getOutputPath(context, WECHAT_MINIPROGRAM))
        );
        console.log();
      }

      if (targets.includes(BYTEDANCE_MICROAPP)) {
        console.log(chalk.green('[ByteDance MicroApp] Bundle at:'));
        console.log(
          '   ',
          chalk.underline.white(getOutputPath(context, BYTEDANCE_MICROAPP))
        );
        console.log();
      }
    } else {
      handleWebpackErr(err, stats);
    }
  });
};
