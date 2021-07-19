import { PluginContext } from 'build-scripts';
import type WebpackChain = require('webpack-chain');

export default (config: WebpackChain, value: any, context: PluginContext) => {
  const { webpack } = context;
  if (value) {
    config.plugin('ModuleFederationPlugin').use(webpack.container.ModuleFederationPlugin, [value]);
  }
};