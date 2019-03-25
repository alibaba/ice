const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const logger = require('../../utils/logger');
const getBaseConfig = require('../../config/webpack.block');

module.exports = function buildBlock(cwd, opt) {
  console.log(' ');
  console.log(chalk.yellow(`WARNING: 当前的区块构建方式将不再维护，升级访问 https://github.com/alibaba/ice/wiki/block-preview`));
  console.log(' ');

  const config = getBaseConfig(cwd, 'react');
  config.mode('production');
  config.plugin('progress').use(ProgressBarPlugin);

  const compiler = webpack(config.toConfig());

  const cb = opt.callback || (() => {});
  compiler.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        logger.fatal(err.details);
      }
      cb(err);
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      cb(info.errors);
      logger.fatal(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    cb(null, info);

    logger.success('compile success');
  });
};
