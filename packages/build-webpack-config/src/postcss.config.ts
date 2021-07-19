import defaultConfig from './defaultPostcssConfig';

export default () => ({
  ...defaultConfig,
  plugins: defaultConfig.plugins?.map(([pluginName, pluginOptions]: [string, any]) => {
    // eslint-disable-next-line
    return require(pluginName)(pluginOptions);
  }),
});
