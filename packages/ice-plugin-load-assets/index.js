const icePluginWrapCode = require('ice-plugin-wrap-code');
const getLoadScriptsCode = require('./getLoadScriptsCode');

const parseArray = (url) => (Array.isArray(url) ? url : [url]);

module.exports = ({ chainWebpack, log, context }, pluginOptions = {}) => {
  const { command } = context;
  const { assets } = pluginOptions;
  if (assets) {
    // inject code of getLoadScriptsCode
    icePluginWrapCode({ chainWebpack, log }, {
      addCodeBefore: `var initLoadUrls = (window.assetsUrls || []).concat(window.customUrls || []);
        ${getLoadScriptsCode()}
        __loadUrls__(initLoadUrls, function(){`,
      addCodeAfter: '})',
      id: 'loadUrl',
    });
    const assetsUrls = { dev: [], build: [] };
    // get assets urls of different command
    ['dev', 'build'].forEach((env) => {
      if (assetsUrls[env]) {
        assetsUrls[env] = assetsUrls[env].concat(parseArray(assets[env]));
      } else if (typeof assets === 'string' || Array.isArray(assets)) {
        assetsUrls[env] = assetsUrls[env].concat(parseArray(assets));
      }
    });
    chainWebpack((config) => {
      config.plugin('loadUrlWrapCodePlugin').tap(([options]) => [
        { ...options,
          addCodeBefore: `window.assetsUrls = ${JSON.stringify(assetsUrls[command])};
            ${options.addCodeBefore || ''}`,
        },
      ]);
    });
  }
};
