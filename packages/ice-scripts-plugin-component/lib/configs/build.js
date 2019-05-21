const generateEntryJs = require('../utils/generateEntryJs');
const setAssetsPath = require('../utils/setAssetsPath');
const getReadme = require('../utils/getReadme');
const formatPathForWin = require('../utils/formatPathForWin');

module.exports = (config, { demos, markdownParser, context }) => {
  const entry = {
    index: generateEntryJs({
      template: 'index.js.hbs',
      filename: 'component-index.js',
      context,
      params: {
        demos: demos.map((demo) => ({ path: formatPathForWin(demo.filePath) })),
      },
    }),
  };
  config.output.publicPath('./');
  ['scss', 'scss-module', 'css', 'css-module', 'less', 'less-module'].forEach((rule) => {
    if (config.module.rules.get(rule)) {
      config.module.rule(rule).use('MiniCssExtractPlugin.loader').tap(() => ({ publicPath: '../' }));
    }
  });
  // set outputAssetsPath { js: '', css: '' }
  setAssetsPath(config);
  // modify HtmlWebpackPlugin when build demo
  const readme = getReadme(context, markdownParser);
  config.plugin('HtmlWebpackPlugin').tap(() => [{
    template: require.resolve('../template/index.html.hbs'),
    filename: 'index.html',
    ...readme,
    demos,
  }]);

  // modify entry
  config.entryPoints.clear();
  config.merge({ entry });
};
