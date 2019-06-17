const path = require('path');
const WrapCodePlugin = require('./wrap-code-webpack-plugin');

module.exports = ({ chainWebpack, log }, pluginOptions = {}) => {
  const { addCodeBefore, addCodeAfter, id = '', debug } = pluginOptions;
  if (addCodeBefore || addCodeAfter) {
    // use id to specify a new plugin name
    chainWebpack((config) => {
      const pluginName = `${id}WrapCodePlugin`;
      if (config.plugins.get(pluginName)) {
        log.error(`wrap code plugin: ${id} has been already defined`);
      } else {
        config.plugin(pluginName).use(WrapCodePlugin, [{
          addCodeBefore,
          addCodeAfter,
          fileMatch: (chunkName, compilerEntry) => {
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
          },
        }]);
      }
    });
  }
};
