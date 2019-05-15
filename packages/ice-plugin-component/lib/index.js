const path = require('path');
const { last } = require('lodash');
const demoRouter = require('./utils/demoRouter');
const { getPkgJSON } = require('./utils/pkgJson');
const { parseMarkdownParts } = require('./utils/markdownHelper');
const getDemos = require('./utils/getDemos');
const generateEntryJs = require('./utils/generateEntryJs');
const getReadme = require('./utils/getReadme');
const buildSrc = require('./utils/buildSrc');

function getFilename(filePath) {
  return last((filePath || '').split('/'));
}
module.exports = (api) => {
  const { command, context } = api.service;
  const pkg = getPkgJSON(context);

  function setAssetsPath(config, outputAssetsPath = { js: '', css: '' }) {
    const filename = getFilename(config.output.get('filename'));
    config.output.filename(path.join(outputAssetsPath.js, filename));
    const options = config.plugin('MiniCssExtractPlugin').get('args')[0];
    config.plugin('MiniCssExtractPlugin').tap((args) => [Object.assign(...args, {
      filename: path.join(outputAssetsPath.css, getFilename(options.filename)),
    })]);
  }

  api.chainWebpack((config) => {
    const babelConfig = config.module.rule('jsx').use('babel-loader').get('options');
    delete babelConfig.cacheDirectory;
    const markdownParser = parseMarkdownParts(babelConfig);
    // disable vendor
    config.optimization.splitChunks({ cacheGroups: {} });
    // modify entry
    const demos = getDemos(context, markdownParser);
    let entry;
    if (command === 'dev') {
      const componentEntry = {};
      demos.forEach((demo) => {
        const demoName = demo.filename;
        const demoFile = path.join('demo', `${demoName}.md`);
        componentEntry[`__Component_Dev__.${demoName}`] = demoFile;
      });
      entry = api.processEntry(componentEntry);
      // remove HtmlWebpackPlugin when run dev
      config.plugins.delete('HtmlWebpackPlugin');
      setAssetsPath(config, { js: 'js', css: 'css' });
    } else if (command === 'build') {
      entry = api.processEntry(generateEntryJs(demos, context));
      config.output.publicPath('./');
      ['scss', 'scss-module', 'css', 'css-module', 'less', 'less-module'].forEach((rule) => {
        if (config.module.rules.get(rule)) {
          config.module.rule(rule).use('MiniCssExtractPlugin.loader').tap(() => ({ publicPath: '../' }));
        }
      });

      // modify outputAssetsPath
      // set outputAssetsPath { js: '', css: '' }
      setAssetsPath(config);
      // modify HtmlWebpackPlugin when build demo
      const readme = getReadme(context, markdownParser);
      config.plugin('HtmlWebpackPlugin').tap(() => [{
        template: require.resolve('./template/index.html.hbs'),
        filename: 'index.html',
        ...readme,
        demos,
      }]);
    }
    config.entryPoints.clear();
    config.merge({ entry });
    // remove CopyWebpackPlugin
    config.plugins.delete('CopyWebpackPlugin');

    // add demo loader
    config.module.rule('demo-loader').test(/\.md$/i).use('demo')
      .loader(require.resolve('./utils/loaders/componentDemoLoader'))
      .options({ parser: markdownParser });
    // modify webpack devServer
    config.devServer
      .after(demoRouter(api.service.context, markdownParser))
      .contentBase(false);
    // add packagename to webpack alias
    config.resolve.alias
      .set(pkg.name, path.resolve(context, 'src/index'));
    // add @babel/plugin-transform-runtime
    // @babel/preset-env modules: commonjs
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          const presets = (options.presets || []).map((preset) => {
            if (Array.isArray(preset) && preset[0].indexOf('preset-env')) {
              return [
                preset[0],
                {
                  ...preset[1],
                  modules: 'commonjs',
                },
              ];
            }
            return preset;
          });
          return Object.assign(options, { presets });
        });
    });
    // modify pkg home page

    // component build
    buildSrc(babelConfig, context);
    // adaptor build
  });
};
