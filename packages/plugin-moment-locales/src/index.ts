import type { IPlugin } from 'build-scripts';
import vitePluginMoment from './vitePluginMoment';

interface PluginOptions {
  locales: string | string[];
}

const plugin: IPlugin = ({ onGetWebpackConfig, modifyUserConfig, context }, options) => {
  const { webpack, userConfig } = context;
  const { locales } = options as unknown as PluginOptions || {};
  if (userConfig.vite) {
    modifyUserConfig('vite.plugins', [vitePluginMoment(locales)] , { deepmerge: true });
  } else {
    onGetWebpackConfig((config) => {
      const localeArray = typeof locales === 'string' ? [locales] : locales;
      if (localeArray.length) {
        const localesRegExp = new RegExp(localeArray.join('|'));
        config.plugin('context-replacement')
          .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, localesRegExp]);
      }
    });
  }
  
};

export default plugin;