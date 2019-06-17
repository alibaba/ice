const icePluginWrapCode = require('ice-plugin-wrap-code');
const getLoadScriptsCode = require('./getLoadScriptsCode');

const parseArray = (url) => (Array.isArray(url) ? url : [url]);

module.exports = ({ chainWebpack, log, context }, pluginOptions = {}) => {
  const { command } = context;
  const { externals } = pluginOptions;
  if (externals) {
    const externalsConfig = {};
    const loadUrls = { development: [], production: [] };
    Object.keys(externals).forEach((key) => {
      const { global, urls } = externals[key];
      externalsConfig[key] = global;
      ['development', 'production'].forEach((env) => {
        if (urls[env]) {
          loadUrls[env] = loadUrls[env].concat(parseArray(urls[env]));
        } else if (typeof urls === 'string' || Array.isArray(urls)) {
          loadUrls[env] = loadUrls[env].concat(parseArray(urls));
        }
      });
    });
    // config externals
    chainWebpack((config) => {
      config.externals(externalsConfig);
    });
    // apply icePluginWrapCode
    icePluginWrapCode({ chainWebpack, log }, {
      addCodeBefore: `var initLoadUrls = ${JSON.stringify(command === 'dev' ? loadUrls.development : loadUrls.production)};
        ${getLoadScriptsCode()}
        loadUrls(initLoadUrls, function(){`,
      addCodeAfter: '})',
      id: 'loadUrl',
    });
  } else {
    log.error('external must be an array');
  }
};
