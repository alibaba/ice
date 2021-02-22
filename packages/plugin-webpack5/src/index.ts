import { IPlugin } from '@alib/build-scripts';

const plugin: IPlugin = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    // compatible with process
    config
      .plugin('DefinePlugin')
      // @ts-ignore
      .tap(([args]) => [{ 
        process: JSON.stringify({}),
        'process.env': JSON.stringify({}),
        ...args,
      }]);

    // BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
    // This is no longer the case. Verify if you need these module and configure a polyfill for it.
    config.resolve.alias.set('path', 'path-browserify');

    // remove CaseSensitivePathsPlugin which do not compatible with webpack 5
    config.plugins.delete('CaseSensitivePathsPlugin');
  });
};

export default plugin;