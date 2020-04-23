const path = require('path');
const fs = require('fs-extra');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolveEntryPath = (entry, rootDir) => {
  if (typeof entry === 'string') {
    return path.isAbsolute(entry) ? entry : path.resolve(rootDir, entry);
  } else if (Array.isArray(entry)) {
    return entry.map((file) => resolveEntryPath(file, rootDir));
  }
  return '';
};

const addHotDevClient = (entry) => {
  const webpackDevClientEntry = require.resolve('react-dev-utils/webpackHotDevClient');
  const hotEntries = {};

  Object.keys(entry).forEach((key) => {
    hotEntries[key] = [webpackDevClientEntry, ...entry[key]];
  });

  return hotEntries;
};

// entry: string | array
// entry : { [name]: string | array }
module.exports = (config, value, context) => {
  const { rootDir, command, userConfig, commandArgs } = context;
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
  const isMultiEntry = entryNames.length > 1;
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
    config.plugin('CopyWebpackPlugin').tap(([args]) => [[{
      ...(args[0] || {}),
      ignore: ignoreFiles,
    }]]);
  }

  // add webpackHotDevClient when execute command is start and enable HMR
  if (!commandArgs.disableReload && command === 'start') {
    entry = addHotDevClient(entry);
  }
  // remove default entry then add new enrty to webpack config
  config.entryPoints.clear();
  config.merge({ entry });
};
