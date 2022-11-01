import type { Plugin } from '@ice/app/esm/types';

interface PluginOptions {
  locales: string | string[];
}

const plugin: Plugin<PluginOptions> = (options) => ({
  name: '@ice/plugin-moment-locales',
  setup: ({ onGetConfig, context }) => {
    const { locales } = options || {};
    if (locales) {
      onGetConfig((config) => {
        config.plugins ??= [];
        const localeArray = typeof locales === 'string' ? [locales] : locales;
        config.plugins.push(new context.webpack.ContextReplacementPlugin(
          /moment[/\\]locale$/,
          new RegExp(localeArray.join('|')),
        ));
      });
    }
  },
});

export default plugin;
