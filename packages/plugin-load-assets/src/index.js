const buildPluginWrapCode = require('build-plugin-wrap-code');
const getLoadScriptsCode = require('./getLoadScriptsCode');

const parseArray = (url) => (Array.isArray(url) ? url : [url]);

module.exports = ({ onGetWebpackConfig, log, context, getAllTask, ...restApi }, pluginOptions = {}) => {
  const { command } = context;
  const { assets } = pluginOptions;
  if (assets) {
    // inject code of getLoadScriptsCode
    buildPluginWrapCode({ onGetWebpackConfig, log, context, ...restApi }, {
      addCodeBefore: `var initLoadUrls = (window.assetsUrls || []).concat(window.customUrls || []);
        ${getLoadScriptsCode()}
        __loadUrls__(initLoadUrls, function(){`,
      addCodeAfter: '})',
      id: 'loadUrl',
    });
    const assetsUrls = { start: [], build: [] };
    // get assets urls of different command
    ['start', 'build'].forEach((env) => {
      if (assets[env]) {
        assetsUrls[env] = assetsUrls[env].concat(parseArray(assets[env]));
      } else if (typeof assets === 'string' || Array.isArray(assets)) {
        assetsUrls[env] = assetsUrls[env].concat(parseArray(assets));
      }
    });
    const taskNames = getAllTask();
    // compatible with dist output of component dev
    const ignoreTasks = ['component-dist'];
    taskNames.forEach((taskName) => {
      onGetWebpackConfig(taskName, (config) => {
        if (ignoreTasks.includes(taskName)) {
          config.plugins.delete('loadUrlWrapCodePlugin');
        } else {
          config.plugin('loadUrlWrapCodePlugin').tap(([options]) => [
            { ...options,
              addCodeBefore: `window.assetsUrls = ${JSON.stringify(assetsUrls[command])};
                ${options.addCodeBefore || ''}`,
            },
          ]);
        }
      });
    }); 
  }
};
