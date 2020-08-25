const path = require('path');
const WrapCodePlugin = require('./wrapCodeWebpackPlugin');

module.exports = ({ onGetWebpackConfig, log, context }, pluginOptions = {}) => {
  const { addCodeBefore, addCodeAfter, fileMatch, id = '' } = pluginOptions;
  const { userConfig } = context;
  if (addCodeBefore || addCodeAfter) {
    // use id to specify a new plugin name
    onGetWebpackConfig((config) => {
      const pluginName = `${id}WrapCodePlugin`;
      if (config.plugins.get(pluginName)) {
        log.verbose(`wrap code plugin: ${id} has been already defined`);
      } else {
        if (fileMatch && typeof fileMatch !== 'function') {
          log.error('fileMatch must be a function');
          return;
        }
        config.plugin(pluginName).use(WrapCodePlugin, [{
          addCodeBefore,
          addCodeAfter,
          fileMatch: fileMatch || ((chunkName, compilerEntry) => {
            const entryKeys = Object.keys(compilerEntry || {});
            // filter entry js file
            if (entryKeys.length && /\.js$/.test(chunkName)) {
              // index.js => index, index.[hash:6].js => index, __Component_Dev__.usage.js => __Component_Dev__.usage
              const assetsBaseName = path.basename(chunkName, path.extname(chunkName));
              const assetsName = userConfig.hash
                ? assetsBaseName.substring(0, assetsBaseName.lastIndexOf('.'))
                : assetsBaseName;
              if (entryKeys.indexOf(assetsName) !== -1) {
                log.verbose(`\nadd code to ${chunkName}`);
                return true;
              }
            }
            return false;
          }),
        }]);
      }
    });
  }
};
