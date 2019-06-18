const icePluginWrapCode = require('ice-plugin-wrap-code');
const getLoadScriptsCode = require('./getLoadScriptsCode');

const parseArray = (url) => (Array.isArray(url) ? url : [url]);

module.exports = ({ chainWebpack, log, context }, pluginOptions = {}) => {
  const { command } = context;
  const { externals } = pluginOptions;
  if (externals) {
    // inject code of getLoadScriptsCode
    icePluginWrapCode({ chainWebpack, log }, {
      addCodeBefore: `var initLoadUrls = (window.externalUrls || []).concat(window.customUrls || []);
        ${getLoadScriptsCode()}
        __loadUrls__(initLoadUrls, function(){`,
      addCodeAfter: '})',
      id: 'loadUrl',
    });

    const externalsConfig = {};
    const loadUrls = { development: [], production: [] };
    // get externals config and urls need to load
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
      config.plugin('loadUrlWrapCodePlugin').tap(([options]) => [
        { ...options,
          addCodeBefore: `window.externalUrls = ${JSON.stringify(command === 'dev' ? loadUrls.development : loadUrls.production)};
            ${options.addCodeBefore || ''}`,
        },
      ]);
    });
  }
};
