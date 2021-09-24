import type { IPlugin } from 'build-scripts';

interface PluginOptions {
  locales: string | string[];
}

const plugin: IPlugin = ({ onGetWebpackConfig, context }, options) => {
  const { webpack } = context;
  onGetWebpackConfig((config) => {
    const { locales } = options as unknown as PluginOptions || {};
    const localeArray = typeof locales === 'string' ? [locales] : locales;
    if (localeArray.length) {
      const localesRegExp = new RegExp(localeArray.join('|'));
      config.plugin('context-replacement')
        .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, localesRegExp]);
    }
  });
};

export default plugin;