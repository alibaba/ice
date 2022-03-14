const chalk = require('chalk');
const formatWebpackMessages = require('@builder/pack/deps/react-dev-utils/formatWebpackMessages');
const openBrowser = require('@builder/pack/deps/react-dev-utils/openBrowser');
const logWebpackConfig = require('./utils/logWebpackConfig');

module.exports = (api) => {
  const { onHook, context, getValue } = api;
  const { commandArgs } = context;

  onHook('before.start.run', ({ config }) => {
    logWebpackConfig(config);
  });

  onHook('after.start.compile', ({ urls, stats }) => {
    const serverPath = getValue('SERVER_PATH') || '';
    const statsJson = stats.toJson({
      all: false,
      errors: true,
      warnings: true,
      timings: true,
    });
    // compatible with webpack 5
    ['errors', 'warnings'].forEach((jsonKey) => {
      statsJson[jsonKey] = (statsJson[jsonKey] || []).map((item) => (item.message || item));
    });
    const messages = formatWebpackMessages(statsJson);
    // 包含错误时不打印 localUrl 和 assets 信息
    const isSuccessful = !messages.errors.length;
    if (isSuccessful) {
      if (!commandArgs.disableAssets) {
        console.log(stats.toString({
          errors: false,
          warnings: false,
          colors: true,
          assets: true,
          chunks: false,
          entrypoints: false,
          modules: false,
          timings: false
        }));
      }

      console.log();
      console.log(chalk.green(' Starting the development server at:'));
      if (process.env.CLOUDIDE_ENV) {
        console.log('   - IDE server: ', `https://${process.env.WORKSPACE_UUID}-${commandArgs.port}.${process.env.WORKSPACE_HOST}`);
      } else {
        console.log('   - Local  : ', chalk.underline.white(getLocalUrl(urls.localUrlForBrowser, serverPath)));
        console.log('   - Network: ', chalk.underline.white(getLocalUrl(urls.lanUrlForTerminal, serverPath)));
      }
      console.log();
    }
  });

  // open browser on server start
  if (!commandArgs.disableOpen) {
    onHook('after.start.devServer', ({ url }) => {
      const serverPath = getValue('SERVER_PATH') || '';
      // do not open browser when restart dev
      if (!process.env.RESTART_DEV) openBrowser(getLocalUrl(url, serverPath));
    });
  }
};

function getLocalUrl(url, serverPath) {
  // lanUrlForTerminal returns undefined url when config host
  return serverPath && url ? `${url}${serverPath}` : url;
}
