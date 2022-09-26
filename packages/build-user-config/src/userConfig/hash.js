const path = require('path');
const { formatPath } = require('@builder/app-helpers');

module.exports = (config, hash, context) => {
  const { command } = context;
  // default is false
  if (hash) {
    // eslint-disable-next-line global-require
    const webpack = require('webpack');
    const defaultHash = webpack.version.startsWith('4') ? 'hash:6' : 'fullhash:6';
    // can not use [chunkhash] or [contenthash] for chunk in dev mode
    const hashStr = typeof hash === 'boolean' || command === 'start' ? defaultHash : hash;
    const fileName = config.output.get('filename');
    let pathArray = fileName.split('/');
    pathArray.pop(); // pop filename
    pathArray = pathArray.filter((v) => v);
    const outputPath = pathArray.length ? pathArray.join('/') : '';
    config.output.filename(formatPath(path.join(outputPath, `[name].[${hashStr}].js`)));
    if (config.plugins.get('MiniCssExtractPlugin')) {
      config.plugin('MiniCssExtractPlugin').tap((args) => [
        Object.assign(...args, {
          filename: formatPath(path.join(outputPath, `[name].[${hashStr}].css`)),
        }),
      ]);
    }
  }
};
