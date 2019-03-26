/**
 * 根据 demo 文件等构建 build/index.html
 */
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const hbs = require('handlebars');
const webpack = require('webpack');
const formatMessages = require('webpack-format-messages');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getWebpackConfig = require('../config/webpack.config.basic');
const { appDirectory } = require('../config/paths');
const getDemos = require('./getDemos');
const { parseMarkdownParts } = require('./markdownHelper');
const logger = require('../utils/log');

module.exports = (buildConfig, callback) => {
  const buildDir = path.join(appDirectory, 'build');

  logger.info('clean', buildDir);
  rimraf.sync(buildDir);

  const demos = getDemos(appDirectory);
  const entryJS = generateEntryJS(demos);
  const readme = getReadme(appDirectory);

  const webpackConfig = getWebpackConfig({
    entry: {
      index: entryJS,
    },
    buildConfig: {
      output: {
        path: path.resolve(appDirectory, 'build'),
        publicPath: './',
        filename: '[name].js',
      },
      outputAssetsPath: {
        css: '',
        js: '',
      },
    },
  });

  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../template/component/index.html.hbs'),
      filename: 'index.html',
      ...readme,
      demos,
    })
  );

  const compiler = webpack(webpackConfig);

  compiler.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        logger.fatal(err.details);
      }
      callback(err);
      return;
    }

    const messages = formatMessages(stats);

    if (!messages.errors.length && !messages.warnings.length) {
      logger.info('Demo build successfully!');
      callback(null);
      return;
    }

    if (messages.errors.length) {
      logger.error('Failed to build demo.');
      messages.errors.forEach((error) => {
        logger.error(error);
      });
      callback(new Error('Demo build failed!'));
      return;
    }

    logger.warn('Demo build with warnings.');
    messages.warnings.forEach((w) => logger.warn(w));
    callback(null);
  });
};

function generateEntryJS(demos) {
  const hbsTemplatePath = path.join(__dirname, '../template/component/index.js.hbs');
  const hbsTemplateContent = fs.readFileSync(hbsTemplatePath, 'utf-8');
  const compileTemplateContent = hbs.compile(hbsTemplateContent);

  const tempPath = getTempPath();
  const jsPath = path.join(tempPath, 'component-index.js');

  const jsTemplateContent = compileTemplateContent({
    demos: demos.map((demo) => {
      return {
        path: formatPathForWin(demo.filePath),
      };
    }),
  });

  fs.writeFileSync(jsPath, jsTemplateContent);

  return jsPath;
}

function getReadme(cwd) {
  const filePath = path.join(cwd, 'README.md');
  const markdown = fs.readFileSync(filePath, 'utf-8');
  const { content: readme, meta = {}} = parseMarkdownParts(markdown);

  return {
    meta,
    readme,
  };
}

function getTempPath() {
  const TEMP_PATH = path.join(__dirname, '../.tmp');
  if (!fs.existsSync(TEMP_PATH)) {
    fs.mkdirSync(TEMP_PATH);
  }
  return TEMP_PATH;
}

function formatPathForWin(filepath) {
  const isWin = process.platform === 'win32';
  return isWin ? filepath.replace(/\\/g, '\\\\') : filepath;
}
