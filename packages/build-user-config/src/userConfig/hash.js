const path = require('path');
const { formatPath } = require('@builder/app-helpers');

module.exports = (config, hash, context) => {
  const { command } = context;
  // default is false
  if (hash) {
    // can not use [chunkhash] or [contenthash] for chunk in dev mode
    const hashStr = typeof hash === 'boolean' || command === 'start' ? 'hash:6' : hash;
    const fileName = config.output.get('filename');
    let pathArray = fileName.split('/');
    pathArray.pop(); // pop filename
    pathArray = pathArray.filter((v) => v);
    const outputPath = pathArray.length ? pathArray.join('/') : '';
    config.output.filename(formatPath(path.join(outputPath, `[name].[${hashStr}].js`)));
    if (config.plugins.get('MiniCssExtractPlugin')) {
      config.plugin('MiniCssExtractPlugin').tap((args) => [Object.assign(...args, {
        filename: formatPath(path.join(outputPath, `[name].[${hashStr}].css`)),
      })]);
    }
  }
};
