const path = require('path');
const { last } = require('lodash');
const formatWinPath = require('../utils/formatWinPath');

function getFilename(filePath) {
  return last((filePath || '').split('/'));
}
module.exports = ({ chainWebpack }, outputAssetsPath) => {
  chainWebpack((config) => {
    const filename = getFilename(config.output.get('filename'));
    config.output.filename(formatWinPath(path.join(outputAssetsPath.js || '', filename)));

    const options = config.plugin('MiniCssExtractPlugin').get('args')[0];
    config.plugin('MiniCssExtractPlugin').tap((args) => [Object.assign(...args, {
      filename: formatWinPath(path.join(outputAssetsPath.css || '', getFilename(options.filename))),
    })]);
  });
};
