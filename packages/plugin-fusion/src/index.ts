import { createRequire } from 'module';
import * as path from 'path';
import type { Plugin } from '@ice/app/types';
import styleImportPlugin from '@ice/style-import';

interface PluginOptions {
  theme?: Record<string, string>;
  themePackage?: string;
  importStyle?: Boolean | string;
}

const require = createRequire(import.meta.url);

function formatPath(pathStr: string): string {
  return process.platform === 'win32' ? pathStr.split(path.sep).join('/') : pathStr;
}

function getVariablesPath({
  packageName,
  filename = 'variables.scss',
  silent = false,
}) {
  let filePath = '';
  const variables = `${packageName}/${filename}`;
  try {
    filePath = require.resolve(variables);
  } catch (err) {
    if (!silent) {
      console.log('[ERROR]', `fail to resolve ${variables}`);
    }
  }
  return formatPath(filePath);
}

const plugin: Plugin<PluginOptions> = (options = {}) => ({
  name: '@ice/plugin-fusion',
  setup: ({ onGetConfig, createLogger, generator }) => {
    const { theme, themePackage, importStyle } = options;
    if (importStyle) {
      onGetConfig((config) => {
        config.transformPlugins = [...(config.transformPlugins || []), styleImportPlugin({
          libraryName: '@alifd/next',
          style: (name) => `@alifd/next/es/${name.toLocaleLowerCase()}/${importStyle === 'sass' ? 'style' : 'style2'}`,
        })];
      });
    }
    if (theme || themePackage) {
      // Try to get icon.scss if exists.
      const iconFile = getVariablesPath({
        packageName: themePackage,
        filename: 'icons.scss',
        silent: true,
      });
      if (iconFile) {
        generator.addEntryImportAhead({
          source: iconFile,
        });
      }
      onGetConfig((config) => {
        // Modify webpack config of scss rule for fusion theme.
        config.configureWebpack ??= [];
        config.configureWebpack.push((webpackConfig) => {
          const { rules } = webpackConfig.module;
          let sassLoader = null;
          rules.some((rule) => {
            if (typeof rule === 'object' &&
              rule.test instanceof RegExp &&
              rule?.test?.source?.match(/scss/)) {
              sassLoader = Array.isArray(rule?.use) &&
                rule.use.find((use) => typeof use === 'object' && use.loader.includes('sass-loader'));
              return true;
            }
            return false;
          });
          if (sassLoader) {
            const additionalContent = [
              `$css-prefix: '${theme?.['css-prefix'] || 'next-'}' !default;`,
            ];
            if (themePackage) {
              const themeFile = getVariablesPath({
                packageName: themePackage,
              });
              if (themeFile) {
                additionalContent.push(`@import '${themePackage}/variables.scss';`);
                if (importStyle === true) {
                  createLogger('Plugin Fusion').warn('themePackage is configured, please configurate importStyle as "sass", ' +
                    'ohterwise, themes defined by sass variables will not take effect.');
                }
              }
            }
            let themeConfig = [];
            Object.keys(theme || {}).forEach((key) => {
              themeConfig.push(`$${key}: ${theme[key]};`);
            });
            additionalContent.push(themeConfig.join('\n'));

            const loaderOptions = sassLoader.options || {};
            sassLoader.options = {
              ...loaderOptions,
              additionalData: (content, loaderContext) => {
                const originalContent = typeof loaderOptions.additionalData === 'function'
                  ? loaderOptions.additionalData(content, loaderContext)
                  : `${loaderOptions.additionalData || ''}${content}`;
                return `${additionalContent.join('\n')}\n${originalContent}`;
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
