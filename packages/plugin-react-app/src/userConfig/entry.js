const path = require('path');
const fs = require('fs-extra');
const HtmlWebpackPlugin = require('@builder/pack/deps/html-webpack-plugin');

const resolveEntryPath = (entry, rootDir) => {
  if (typeof entry === 'string') {
    return path.isAbsolute(entry) ? entry : path.resolve(rootDir, entry);
  } else if (Array.isArray(entry)) {
    return entry.map((file) => resolveEntryPath(file, rootDir));
  }
  return '';
};

// entry: string | array
// entry : { [name]: string | array }
module.exports = (config, value, context) => {
  const { rootDir, command, userConfig } = context;

  const ignoreHtmlTemplate = command === 'build' && userConfig.ignoreHtmlTemplate;
  let entry;
  if (Array.isArray(value) || typeof value === 'string') {
    entry = {
      index: value,
    };
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    entry = value;
  }

  const entryNames = Object.keys(entry);
  const isMultiEntry = entryNames.length > 1 || userConfig.mpa;
  let pluginConfig = {};
  if (config.plugins.get('HtmlWebpackPlugin')) {
    pluginConfig = { ...config.plugin('HtmlWebpackPlugin').get('args')[0] };
    if (isMultiEntry || ignoreHtmlTemplate) {
      // remove default HtmlWebpackPlugin
      config.plugins.delete('HtmlWebpackPlugin');
    }
  }
  const ignoreFiles = ['index.html'];
  // generate multiple html file
  // webpack-chain entry must be [name]: [...values]
  entryNames.forEach((entryName) => {
    const entryValue = resolveEntryPath(entry[entryName], rootDir);
    entry[entryName] = typeof entryValue === 'string' ? [entryValue] : entryValue;

    if (isMultiEntry && !ignoreHtmlTemplate) {
      const pluginKey = `HtmlWebpackPlugin_${entryName}`;
      const filename = `${entryName}.html`;
      const htmlPluginOption = {
        filename,
        excludeChunks: entryNames.filter((n) => n !== entryName),
        inject: true,
      };
      const entryTemplate = path.join(rootDir, 'public', filename);
      if (fs.existsSync(entryTemplate)) {
        htmlPluginOption.template = entryTemplate;
      }
      config.plugin(pluginKey)
        .use(HtmlWebpackPlugin, [{
          ...pluginConfig,
          ...htmlPluginOption,
        }]);

      if (ignoreFiles.indexOf(filename) === -1) {
        ignoreFiles.push(filename);
      }
    }
  });
  // ignore html which will generate by htmlPlugin
  if (config.plugins.get('CopyWebpackPlugin')) {
    config.plugin('CopyWebpackPlugin').tap(([{ patterns, ...restOptions }]) => {
      const [firstPattern, ...rest] = patterns;
      firstPattern.globOptions = {
        ...(firstPattern.globOptions || {}),
        ignore: ignoreFiles.map((ignoreFile) => `**/public/${ignoreFile}`),
      };
      return [{
        patterns: [firstPattern, ...rest],
        ...restOptions,
      }];
    });
  }
  // remove default entry then add new enrty to webpack config
  config.entryPoints.clear();
  config.merge({ entry });
};
