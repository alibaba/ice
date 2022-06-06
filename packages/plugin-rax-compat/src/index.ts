import type { Plugin } from '@ice/types';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const plugin: Plugin = ({ onGetConfig }) => {
  onGetConfig((config) => {
    Object.assign(config.alias, {
      // Add rax compat packages.
      rax: require.resolve('rax-compat'),
      'rax-children': require.resolve('rax-compat/children'),
      'rax-clone-element': require.resolve('rax-compat/clone-element'),
      'rax-create-class': require.resolve('rax-compat/create-class'),
      'rax-create-factory': require.resolve('rax-compat/create-factory'),
      'rax-create-portal': require.resolve('rax-compat/create-portal'),
      'rax-find-dom-node': require.resolve('rax-compat/find-dom-node'),
      'rax-is-valid-element': require.resolve('rax-compat/is-valid-element'),
      'rax-unmount-component-at-node': require.resolve('rax-compat/unmount-component-at-node'),
    });
  });
};

export default () => ({
  name: '@ice/plugin-rax-compat',
  plugin,
});
