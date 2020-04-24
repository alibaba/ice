const WebpackBar = require('webpackbar');

module.exports = (config, webpackbarOptions) => {
  if (config.plugins.get('SimpleProgressPlugin')) {
    config
      .plugins
      .delete('SimpleProgressPlugin');
    config
    .plugin('WebpackBar')
      .use(WebpackBar)
      .tap(([args]) => [{
        ...args,
        ...webpackbarOptions
      }]);
  }
};

