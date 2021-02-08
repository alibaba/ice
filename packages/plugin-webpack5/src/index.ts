import { IPlugin } from '@alib/build-scripts';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const plugin: IPlugin = ({ onGetWebpackConfig, registerUserConfig }) => {
  registerUserConfig({
    name: 'moduleFederation',
    validation: 'object',
    async configWebpack(config, value, context) {
      const { ModuleFederationPlugin } = (context.webpack as any).container;
      config.plugin('ModuleFederationPlugin').use(ModuleFederationPlugin, [value]);
    },
  });
  onGetWebpackConfig((config) => {
    if (config.plugins.get('HtmlWebpackPlugin')) {
      // use html-webpack-plugin which compatible with webpack5
      const pluginConfig = { ...config.plugin('HtmlWebpackPlugin').get('args')[0] };
      config.plugins.delete('HtmlWebpackPlugin');
      config.plugin('HtmlWebpackPlugin').use(HtmlWebpackPlugin, [pluginConfig]);
    }
    // compatible with process
    config
      .plugin('DefinePlugin')
      // @ts-ignore
      .tap(([args]) => [{
        ...args,
        process: JSON.stringify({}),
        'process.env': JSON.stringify({})},
      ]);
    if (config.plugins.get('WebpackPluginImport')) {
      // WebpackPluginImport is not compatible with webpack5
      config.plugins.delete('WebpackPluginImport');
    }

    // BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
    // This is no longer the case. Verify if you need these module and configure a polyfill for it.
    config.resolve.alias.set('path', 'path-browserify');
  });
};

export default plugin;