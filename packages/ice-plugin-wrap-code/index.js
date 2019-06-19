const path = require('path');
const WrapCodePlugin = require('./wrapCodeWebpackPlugin');

module.exports = ({ chainWebpack, log }, pluginOptions = {}) => {
  const { addCodeBefore, addCodeAfter, fileMatch, id = '', debug } = pluginOptions;
  if (addCodeBefore || addCodeAfter) {
    // use id to specify a new plugin name
    chainWebpack((config) => {
      const pluginName = `${id}WrapCodePlugin`;
      if (config.plugins.get(pluginName)) {
        if (debug) {
          log.info(`wrap code plugin: ${id} has been already defined`);
        }
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
              // index.js => index, index.[hash:6].js => index
              const assetsName = path.basename(chunkName, path.extname(chunkName)).split('.')[0];
              if (entryKeys.indexOf(assetsName) !== -1) {
                if (debug) {
                  log.info(`\nadd code to ${chunkName}`);
                }
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
