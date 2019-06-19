const path = require('path');
const formatWinPath = require('../utils/formatWinPath');

module.exports = ({ chainWebpack, context }, hash) => {
  const { command } = context;
  // default is false
  if (hash) {
    // can not use [chunkhash] or [contenthash] for chunk in dev mode
    const hashStr = typeof hash === 'boolean' || command === 'dev' ? 'hash:6' : hash;
    chainWebpack((config) => {
      const fileName = config.output.get('filename');
      let pathArray = fileName.split('/');
      pathArray.pop(); // pop filename
      pathArray = pathArray.filter((v) => v);
      const outputPath = pathArray.length ? pathArray.join('/') : '';
      config.output.filename(formatWinPath(path.join(outputPath, `[name].[${hashStr}].js`)));
      config.plugin('MiniCssExtractPlugin').tap((args) => [Object.assign(...args, {
        filename: formatWinPath(path.join(outputPath, `[name].[${hashStr}].css`)),
      })]);
    });
  }
};
