import type { Plugin } from '@ice/types';

const plugin: Plugin = ({ onGetConfig }) => {
  onGetConfig((config) => {
    config.configureWebpack = [...(config.configureWebpack || []), (webpackConfig) => {
      webpackConfig.resolve.alias = {
        ...(webpackConfig.resolve.alias || {}),
        rax: 'rax-compat',
      };
      return webpackConfig;
    }];
  });
};

export default () => ({
  name: '@ice/plugin-rax-compat',
  plugin,
});