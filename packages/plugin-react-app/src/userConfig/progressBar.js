const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = (config, progressBarOptions) => {
  if (config.plugins.get('SimpleProgressPlugin')) {
    config
      .plugins
      .delete('SimpleProgressPlugin');
    config
    .plugin('ProgressBarPlugin')
      .use(ProgressBarPlugin)
      .tap(([args]) => [{
        ...args,
        ...progressBarOptions
      }]);
  }
};

