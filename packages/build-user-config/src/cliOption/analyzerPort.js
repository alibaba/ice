module.exports = (config, port) => {
  if (port && config.plugins.get('webpack-bundle-analyzer')) {
    config.plugin('webpack-bundle-analyzer').tap(([args]) => {
      const newArgs = {...args, analyzerPort: port };
      return [newArgs];
    });
  }
};
