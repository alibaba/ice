module.exports = (config, value, context) => {
  if (value) {
    // auto detect webpack 5
    const { webpack } = context;
    if (parseInt(webpack.version, 10) === 5) {
      // compatible with process added by react-dev-utils/webpackHotDevClient
      config
      .plugin('DefinePlugin')
      // @ts-ignore
      .tap(([args]) => [{
        process: JSON.stringify({}),
        'process.env': JSON.stringify({})},
        ...args,
      ]);

      // remove CaseSensitivePathsPlugin which do not compatible with webpack 5
      config.plugins.delete('CaseSensitivePathsPlugin');

      // BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
      // This is no longer the case. Verify if you need these module and configure a polyfill for it.
      config.resolve.alias.set('path', 'path-browserify');
    }
  }
};
