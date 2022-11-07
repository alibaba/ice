import { createRequire } from 'module';
import type { Plugin } from '@ice/app/esm/types';
import styleImportPlugin from '@ice/style-import';

interface PluginOptions {
  theme?: Record<string, string>;
  themePackage?: string;
  importStyle?: Boolean | string;
}

const require = createRequire(import.meta.url);

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
  return filePath;
}

function importIcon(iconPath: string, cssPrefix: string) {
  let entryFile = '';
  return {
    name: 'transform-import-icon',
    enforce: 'pre',
    async transform(code: string, id: string, options: { isServer: boolean }) {
      const { isServer } = options;
      // Only import icon scss in client
      if (!isServer) {
        // Icon just import once.
        if (!entryFile && !id.match(/node_modules/) && id.match(/[js|jsx|ts|tsx]$/)) {
          entryFile = id;
        }
        if (id === entryFile) {
          return `import '${iconPath}';\n${code}`;
        } else if (id === iconPath) {
          return `$css-prefix: '${cssPrefix}';\n${code}`;
        }
      }
    },
  };
}

const plugin: Plugin<PluginOptions> = (options = {}) => ({
  name: '@ice/plugin-fusion',
  setup: ({ onGetConfig }) => {
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
      onGetConfig((config) => {
        // Try to get icon.scss if exists.
        const iconFile = getVariablesPath({
          packageName: themePackage,
          filename: 'icons.scss',
          silent: true,
        });
        if (iconFile) {
          config.transformPlugins = [...(config.transformPlugins || []), importIcon(iconFile, theme['css-prefix'] || 'next-')];
        }
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
            const additionalContent = [];
            if (themePackage) {
              const themeFile = getVariablesPath({
                packageName: themePackage,
              });
              if (themeFile) {
                additionalContent.push(`@import '${themePackage}/variables.scss';`);
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
