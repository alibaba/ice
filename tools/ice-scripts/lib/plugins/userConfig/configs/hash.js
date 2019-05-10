const path = require('path');

module.exports = (api, hash) => {
  // default is false
  if (hash) {
    api.chainWebpack((config) => {
      const fileName = config.output.get('filename');
      let pathArray = fileName.split('/');
      pathArray.pop(); // pop filename
      pathArray = pathArray.filter((v) => v);
      const outputPath = pathArray.length ? pathArray.join('/') : '';
      config.output.filename(path.join(outputPath, '[name].[hash:6].js'));
      config.plugin('mini-css-extract-plugin').tap((args) => [Object.assign(...args, {
        filename: path.join(outputPath, '[name].[hash:6].css'),
      })]);
    });
  }
};
