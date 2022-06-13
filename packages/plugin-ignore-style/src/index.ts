import type { IPlugin } from 'build-scripts';
import type { Plugin } from 'vite';

interface Options {
  libraryName: string;
  style?: string;
  rule?:string;
}

const getStyleRule = (libraryName: string, style = 'style'): string => `${libraryName}/(es|lib)/[-\\w+]+/(${style}|${style}.js|${style}/index.js)$`;
const flattenId = (id: string): string => id.replace(/(\s*>\s*)/g, '__').replace(/[/.]/g, '_');

const plugin: IPlugin = ({ onGetWebpackConfig, modifyUserConfig, log, context }, options) => {
  const { userConfig } = context;
  if (!options) {
    log.warn('config options to make build-plugin-ignore-style work properly');
  } else {
    const libraryConfigs = Array.isArray(options) ? options : [options];
    // default rule for external style
    const externalRule = libraryConfigs.map((value) => {
      const {libraryName, style = 'style', rule} = value as unknown as Options;
      return rule??getStyleRule(libraryName, style);
    }).join('|');
    onGetWebpackConfig((config) => {
      config.module
        .rule('ignore-style')
        .test(new RegExp(externalRule))
        .before('jsx')
        .use('null-loader').loader(require.resolve('./null-loader'));
    });
    if (userConfig.vite) {
      modifyUserConfig('vite', {
        plugins: [
          {
            name: 'vite-ignore-style',
            enforce: 'pre',
            resolveId(id) {
              // vite will flattenId when pre build dependencies
              if (id.match(new RegExp(flattenId(externalRule))) || id.match(new RegExp(externalRule))) {
                return '@null-module';
              }
            },
            load(id: string) {
              if (id === '@null-module') {
                return '';
              }
            },
          } as Plugin
        ],
      }, { deepmerge: true });
    }
  }
};

export default plugin;
