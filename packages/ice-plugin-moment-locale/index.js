const path = require('path');

module.exports = ({ chainWebpack, context }, options = {}) => {
  const { rootDir } = context;
  chainWebpack((config) => {
    // config IgnorePlugin
    config.plugin('IgnorePlugin').tap((args) => [...args, /^\.\/locale$/, /moment$/]);
    const { locale } = options;
    if (locale) {
      const locales = typeof locale === 'string' ? [locale] : locale;
      // get entry list
      // custom webpack loader
      const momentRule = config.module.rule('moment-entry');
      momentRule.test(/\.tsx?$|\.jsx?$/)
        .exclude.add(/node_modules/);

      // only include entry file
      const entries = config.toConfig().entry;
      Object.keys(entries).forEach((entryKey) => {
        const entryInfo = entries[entryKey];
        const entryPath = Array.isArray(entryInfo) ? entryInfo[0] : entryInfo;
        momentRule.include.add(path.join(rootDir, entryPath));
      });

      momentRule
        .use('moment-loader')
        .loader(require.resolve('./entryMomentLoader'))
        .options({ locales })
        .end()
        .before('jsx');
    }
  });
};
