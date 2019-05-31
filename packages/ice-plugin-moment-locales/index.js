const webpack = require('webpack');

module.exports = ({ chainWebpack }, options = {}) => {
  chainWebpack((config) => {
    const { locales } = options;
    const localeArray = typeof locales === 'string' ? [locales] : locales;
    if (localeArray.length) {
      const localesRegExp = new RegExp(localeArray.join('|'));
      config.plugin('context-replacement')
        .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, localesRegExp]);
    }
  });
};
