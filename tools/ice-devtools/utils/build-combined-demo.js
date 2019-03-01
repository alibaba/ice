const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const chalk = require('chalk');
const hbs = require('handlebars');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const stripAnsi = require('strip-ansi');

const getDemos = require('./get-demos');
const getTempPath = require('./temp-path');
const formatPathForWin = require('./format-path-for-win');
const { parseMarkdownParts } = require('./markdown-helper');
const logger = require('./logger');
const formatWebpackMessages = require('./format-webpack-messages');

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

    const info = stats.toJson();

    if (stats.hasErrors()) {
      printErrors(info.errors);
      cb(info.errors);
      return;
    }

    if (stats.hasWarnings()) {
      printWarnings(info.warnings);
    }

    console.log();
    console.log(chalk.green('Write build/index.html'));
    console.log();
    
    cb(null, info);
  });
}

function printWarnings(warnings) {
  // Print warnings to the console.
  var formatted = formatWebpackMessages({
    warnings: warnings,
    errors: []
  });

  for (var i = 0; i < formatted.warnings.length; i++) {
    console.log();
    console.log(chalk.yellow(stripAnsi(formatted.warnings[i])));
  }
}

function printErrors(errors) {
  // Print warnings to the console.
  var formatted = formatWebpackMessages({
    warnings: [],
    errors: errors
  });

  for (var i = 0; i < formatted.errors.length; i++) {
    console.log();
    console.log(chalk.red(stripAnsi(formatted.errors[i])));
  }
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