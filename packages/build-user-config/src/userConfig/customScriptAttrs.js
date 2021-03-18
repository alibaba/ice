const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');

class AddScriptAttrsWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    if (this._hasHtmlWebpackPlugin(compiler)) {
      compiler.hooks.compilation.tap(
        'AddScriptAttrsWebpackPlugin',
        (compilation) => {
          // HtmlWebpackPlugin 4
          if (HtmlWebpackPlugin && HtmlWebpackPlugin.getHooks) {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
              'AddScriptAttrsWebpackPlugin',
              this._addAttributeToScripts.bind(this)
            );
          } else if (compiler.hooks) {
            // HtmlWebpackPlugin 3
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
              'AddScriptAttrsWebpackPlugin',
              this._addAttributeToScripts.bind(this)
            );
          }
        }
      );
    }
  }

  _hasHtmlWebpackPlugin(compiler) {
    const { plugins } = compiler.options;
    return plugins.filter(
      // eslint-disable-next-line no-proto
      (plugin) => plugin.__proto__.constructor.name === 'HtmlWebpackPlugin'
    ).length;
  }

  _addAttr(tags, key, val) {
    tags
      .filter((tag) => tag.tagName === 'script')
      .forEach((script) => {
        script.attributes[key] = val;
      });
  }

  _addAttributeToScripts(htmlPluginData, callback) {
    Object.keys(this.options).forEach((key) => {
      // HtmlWebpackPlugin 4
      if (htmlPluginData.assetTags) {
        this._addAttr(htmlPluginData.assetTags.scripts, key, this.options[key]);
      } else {
        // HtmlWebpackPlugin 3
        this._addAttr(htmlPluginData.head, key, this.options[key]);
        this._addAttr(htmlPluginData.body, key, this.options[key]);
      }
    });
    callback(null, htmlPluginData);
  }
}

module.exports = (webpackConfig, customScriptAttrs = {}) => {
  if (Object.keys(customScriptAttrs).length > 0) {
    webpackConfig
      .plugin('AddScriptAttrsWebpackPlugin')
      .use(AddScriptAttrsWebpackPlugin, [
        {
          ...customScriptAttrs
        }
      ]);
  }
};
