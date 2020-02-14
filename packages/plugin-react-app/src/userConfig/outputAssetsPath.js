const path = require('path');
const { last } = require('lodash');
const formatWinPath = require('../utils/formatWinPath');

function getFilename(filePath) {
  return last((filePath || '').split('/'));
}
module.exports = (config, outputAssetsPath) => {
  const filename = getFilename(config.output.get('filename'));
  config.output.filename(formatWinPath(path.join(outputAssetsPath.js || '', filename)));

  if (config.plugins.get('MiniCssExtractPlugin')) {
    const options = config.plugin('MiniCssExtractPlugin').get('args')[0];
    config.plugin('MiniCssExtractPlugin').tap((args) => [Object.assign(...args, {
      filename: formatWinPath(path.join(outputAssetsPath.css || '', getFilename(options.filename))),
    })]);
  }
};
