const path = require('path');
const { last } = require('lodash');

function getFilename(filePath) {
  return last((filePath || '').split('/'));
}
module.exports = (api, outputAssetsPath) => {
  api.chainWebpack((config) => {
    const filename = getFilename(config.output.get('filename'));
    config.output.filename(path.resolve(outputAssetsPath.js || '', filename));

    const options = config.plugin('mini-css-extract-plugi').get('args')[0];
    config.plugin('mini-css-extract-plugin').tap((args) => [Object.assign(...args, {
      filename: path.resolve(outputAssetsPath.css || '', getFilename(options.filename)),
    })]);
  });
};
