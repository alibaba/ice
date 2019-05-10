const path = require('path');
const { last } = require('lodash');

function getFilename(filePath) {
  return last((filePath || '').split('/'));
}
module.exports = (api, outputAssetsPath) => {
  api.chainWebpack((config) => {
    const filename = getFilename(config.output.get('filename'));
    config.output.filename(path.join(outputAssetsPath.js || '', filename));

    const options = config.plugin('mini-css-extract-plugin').get('args')[0];
    config.plugin('mini-css-extract-plugin').tap((args) => [Object.assign(...args, {
      filename: path.join(outputAssetsPath.css || '', getFilename(options.filename)),
    })]);
  });
};
