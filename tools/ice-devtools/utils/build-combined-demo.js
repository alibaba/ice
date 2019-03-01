const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getDemos = require('./get-demos');
const getTempPath = require('./temp-path');
const formatPathForWin = require('./format-path-for-win');
const { parseMarkdownParts } = require('./markdown-helper');
const logger = require('./logger');

module.exports = (cwd, config, callback) => {
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
      cb(info.errors);
      logger.fatal(info.errors);
    }

    if (stats.hasWarnings()) {
      logger.warn(info.warnings);
    }
    
    cb(null, info);
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