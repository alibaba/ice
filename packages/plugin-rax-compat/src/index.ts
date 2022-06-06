import type { Plugin } from '@ice/types';

const plugin: Plugin = ({ onGetConfig }) => {
  onGetConfig((config) => {
    // @ts-ignore
    config.configureWebpack = [...(config.configureWebpack || []), (webpackConfig) => {
      return Object.assign(webpackConfig.resolve.alias, {
        // Add rax compat packages.
        rax: 'rax-compat',
        'rax-children': 'rax-compat/children',
        'rax-clone-element': 'rax-compat/clone-element',
        'rax-create-class': 'rax-compat/create-class',
        'rax-create-factory': 'rax-compat/create-factory',
        'rax-create-portal': 'rax-compat/create-portal',
        'rax-find-dom-node': 'rax-compat/find-dom-node',
        'rax-is-valid-element': 'rax-compat/is-valid-element',
        'rax-set-native-props': 'rax-compat/set-native-props',
        'rax-unmount-component-at-node': 'rax-compat/unmount-component-at-node',
      });
    }];
  });
};

export default () => ({
  name: '@ice/plugin-rax-compat',
  plugin,
});
