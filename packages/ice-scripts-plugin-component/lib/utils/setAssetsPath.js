const path = require('path');
const { last } = require('lodash');

function getFilename(filePath) {
  return last((filePath || '').split('/'));
}

module.exports = function setAssetsPath(config, outputAssetsPath = { js: '', css: '' }) {
  const filename = getFilename(config.output.get('filename'));
  config.output.filename(path.join(outputAssetsPath.js, filename));
  const options = config.plugin('MiniCssExtractPlugin').get('args')[0];
  config.plugin('MiniCssExtractPlugin').tap((args) => [Object.assign(...args, {
    filename: path.join(outputAssetsPath.css, getFilename(options.filename)),
  })]);
};
