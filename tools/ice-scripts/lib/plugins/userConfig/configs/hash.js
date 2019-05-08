const path = require('path');

module.exports = (api, hash) => {
  // default is false
  if (hash) {
    api.chainWebpack((config) => {
      const fileName = config.output.get('filename');
      const pathArray = fileName.split('/').pop().filter((v) => v);
      const outputPath = pathArray.length ? pathArray.join('/') : '';

      config.output.filename(path.resolve(outputPath, '[name].[hash:6].js'));
      config.plugin('mini-css-extract-plugin').tap((args) => [Object.assign(...args, {
        filename: path.resolve(outputPath, '[name].[hash:6].css'),
      })]);
    });
  }
};
