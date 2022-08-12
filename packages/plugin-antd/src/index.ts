import { createRequire } from 'module';
import type { Plugin } from '@ice/types';
import styleImportPlugin from '@ice/style-import';

interface PluginOptions {
  theme?: Record<string, string>;
  dark?: Boolean;
  compact?: Boolean;
  importStyle?: Boolean;
}

const require = createRequire(import.meta.url);

const plugin: Plugin<PluginOptions> = ({ theme, dark, compact, importStyle }) => ({
  name: '@ice/plugin-antd',
  setup: ({ onGetConfig }) => {
    if (importStyle) {
      onGetConfig((config) => {
        config.transformPlugins = [...(config.transformPlugins || []), styleImportPlugin({
          libraryName: 'antd',
          style: (name) => `antd/es/${name.toLocaleLowerCase()}/style`,
        })];
      });
    }
    if (theme || dark || compact) {
      onGetConfig((config) => {
        // Modify webpack config of less rule for antd theme.
        config.configureWebpack ??= [];
        config.configureWebpack.push((webpackConfig) => {
          const { rules } = webpackConfig.module;
          let lessLoader = null;
          rules.some((rule) => {
            if (typeof rule === 'object' &&
            rule.test instanceof RegExp &&
            rule?.test?.source?.match(/less/)) {
              lessLoader = Array.isArray(rule?.use) &&
                rule.use.find((use) => typeof use === 'object' && use.loader.includes('less-loader'));
              return true;
            }
            return false;
          });
          if (lessLoader) {
            let themeConfig = theme || {};
            if (dark || compact) {
              // Try to get theme config for antd.
              const { getThemeVariables } = require('antd/dist/theme');
              themeConfig = {
                ...(getThemeVariables({
                  dark,
                  compact,
                })),
                ...themeConfig,
              };
            }

            const loaderOptions = lessLoader.options || {};
            lessLoader.options = {
              ...loaderOptions,
              lessOptions: {
                ...(loaderOptions?.lessOptions || {}),
                modifyVars: {
                  ...(loaderOptions?.lessOptions?.modifyVars || {}),
                  ...themeConfig,
                },
              },
            };
          }
          return webpackConfig;
        });
      });
    }
  },
});

export default plugin;