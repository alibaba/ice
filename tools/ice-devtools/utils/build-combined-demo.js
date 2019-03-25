const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const chalk = require('chalk');
const hbs = require('handlebars');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getDemos = require('./get-demos');
const getTempPath = require('./temp-path');
const formatPathForWin = require('./format-path-for-win');
const { parseMarkdownParts } = require('./markdown-helper');
const logger = require('./logger');
const formatMessages = require('webpack-format-messages');

module.exports = (cwd, config, callback) => {
  const demoDir = path.join(cwd, 'build');

  console.log();
  console.log('clean', demoDir);
  console.log();

  rimraf.sync(demoDir);

  const demos = getDemos(cwd);

  const entryJS = generateEntryJS(demos);
  config.entry('index').add(entryJS);

  const readme = getReadme(cwd);
  config.plugin('html').use(HtmlWebpackPlugin, [
    {
      template: path.join(__dirname, `../template/component/index.html.hbs`),
      filename: 'index.html',
      ...readme,
      demos
    }
  ]);

  config.output
    .path(path.join(cwd, 'build'))
    .filename('[name].js')
    .publicPath('./');

  const compiler = webpack(config.toConfig());

  const cb = callback || (() => {});

  compiler.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        logger.fatal(err.details);
      }
      cb(err);
      return;
    }

    const messages = formatMessages(stats);

    if (!messages.errors.length && !messages.warnings.length) {
      console.log();
      console.log(chalk.green('Demo build successfully!'));
      console.log();
      cb();
    }

    if (messages.errors.length) {
      console.log(chalk.red('Failed to build demo.'));
      console.log();
      messages.errors.forEach(e => console.log(chalk.red(e)));
      cb(messages.errors);
      return;
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow('Demo build with warnings.'));
      console.log();
      messages.warnings.forEach(w => console.log(chalk.yellow(w)));
      cb();
      return;
    }
  });
}

function generateEntryJS(demos) {
  const hbsTemplatePath = path.join(__dirname, `../template/component/index.js.hbs`);

  const hbsTemplateContent = fs.readFileSync(hbsTemplatePath, 'utf-8');
  const compileTemplateContent = hbs.compile(hbsTemplateContent);

  const tempPath = getTempPath();
  const jsPath = path.join(tempPath, `component-index.js`);

  const jsTemplateContent = compileTemplateContent({
    demos: demos.map((demo) => {
      return {
        path: formatPathForWin(demo.filePath)
      };
    })
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
    readme
  };
}
