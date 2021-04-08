import { PartialPlugin, Json } from './types';

const entry2urls = (entry: Json<string[]>) => {
  return Object.keys(entry)
    .map(key => entry[key])
    .reduce((pre, next) => pre.concat(next), [])
    .filter(url => !(/node_modules/.test(url)));
};

const appendLifecycle = ({ onGetWebpackConfig }: PartialPlugin) => {
  onGetWebpackConfig('icestark-module', (config) => {
    const entries = entry2urls(config.toConfig().entry as Json<string[]>);

    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((babelOptions) => {
          const { plugins = [] } = babelOptions;
          return {
            ...babelOptions,
            plugins: [
              [require.resolve('./babelPlugin'), { entries }],
              ...plugins,
            ]
          };
        });
    });

  });
};

export default appendLifecycle;
