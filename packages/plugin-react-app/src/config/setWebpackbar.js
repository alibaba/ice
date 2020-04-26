const WebpackBar = require('webpackbar');

module.exports = (config) => {
  if (config.plugins.get('SimpleProgressPlugin')) {
    config
      .plugins
      .delete('SimpleProgressPlugin')
      .end()
      .plugin('WebpackBar')
        .use(WebpackBar)
        .tap((args) => {
          return [
            ...args,
            {
              name: 'client'
            }
          ];
        });
  }
};

