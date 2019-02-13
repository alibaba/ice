const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const logger = require('../../utils/logger');
const getBaseConfig = require('../../config/webpack.block');
const getBlockType = require('../../utils/block-type');

module.exports = function buildBlock(cwd, opt) {
  const blockType = getBlockType(cwd);
  const config = getBaseConfig(cwd, blockType);
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
