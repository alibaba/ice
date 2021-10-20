import type { IPlugin } from 'build-scripts';

interface Options {
  libraryName: string;
  style?: string;
}

const getStyleRule = (libraryName: string, style = 'style'): string => `${libraryName}/(es|lib)/[-\\w+]+/(${style}|${style}.js|${style}/index.js)$`;

const plugin: IPlugin = ({ onGetWebpackConfig, modifyUserConfig, log, context }, options) => {
  const { userConfig } = context;
  if (!options) {
    log.warn('config options to make build-plugin-ignore-style work properly');
  } else {
    const libraryConfigs = Array.isArray(options) ? options : [options];
    // default rule for external style
    const externalRule = libraryConfigs.map((value) => {
      const {libraryName, style = 'style'} = value as unknown as Options;
      return getStyleRule(libraryName, style);
    }).join('|');

    onGetWebpackConfig((config) => {
      config.module.rule('ignore-style').test(new RegExp(externalRule)).use('null-loader');
    });
    if (userConfig.vite) {
      modifyUserConfig('vite', {
        plugins: [
          {
            name: 'vite-ignore-style',
            enforce: 'pre',
            resolveId(id, importer) {
              if (id.match(/next/)) {
                console.log('idres ==>', id, importer);
              }
              
            },
            load(id: string) {
              // console.log('id ==>', id)
              if (new RegExp(externalRule).test(id)) {
                return '';
              }
            },
          }
        ],
      }, { deepmerge: true });
    }
  }
};

export default plugin;
