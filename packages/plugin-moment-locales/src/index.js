module.exports = ({ onGetWebpackConfig, context }, options = {}) => {
  const { webpack } = context;
  onGetWebpackConfig((config) => {
    const { locales } = options;
    const localeArray = typeof locales === 'string' ? [locales] : locales;
    if (localeArray.length) {
      const localesRegExp = new RegExp(localeArray.join('|'));
      config.plugin('context-replacement')
        .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, localesRegExp]);
    }
  });
};
