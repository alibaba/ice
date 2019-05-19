const path = require('path');
const fse = require('fs-extra');
const npmUtils = require('ice-npm-utils');
const demoRouter = require('./utils/demoRouter');
const { getPkgJSON } = require('./utils/pkgJson');
const { parseMarkdownParts } = require('./compile/markdownHelper');
const getDemos = require('./utils/getDemos');
const generateEntryJs = require('./utils/generateEntryJs');
const formatPathForWin = require('./utils/formatPathForWin');
const getReadme = require('./utils/getReadme');
const setAssetsPath = require('./utils/setAssetsPath');
const configBabel = require('./utils/configBabel');
const buildSrc = require('./compile/buildSrc');
const resolveSassImport = require('./compile/resolveSassImport');

module.exports = (api) => {
  const { command, context } = api.service;
  let babelConfig;
  const pkg = getPkgJSON(context);

  // check adaptor folder
  const hasAdaptor = fse.existsSync(path.join(context, 'adaptor'));
  // generate adaptor entry
  let adaptorEntry;
  if (hasAdaptor) {
    adaptorEntry = generateEntryJs({
      template: 'adaptor.js.hbs',
      context,
      params: {
        adaptor: path.resolve(context, 'adaptor/index.js'),
        adaptorGenerate: path.resolve(context, 'node_modules/@alifd/adaptor-generate'),
      },
    });
  }

  api.chainWebpack((config) => {
    // add @babel/plugin-transform-runtime
    // @babel/preset-env modules: commonjs
    configBabel(config, {
      presets: [
        {
          name: '@babel/preset-env',
          opts: {
            modules: 'commonjs',
          },
        },
      ],
      plugins: [
        {
          name: '@babel/plugin-transform-runtime',
          pageBuiltIn: true,
          opts: {
            corejs: false,
            helpers: true,
            regenerator: true,
            useESModules: false,
          },
        },
      ],
    });
    // get babel config for component compile
    babelConfig = config.module.rule('jsx').use('babel-loader').get('options');
    // babel option do not known cacheDirectory
    delete babelConfig.cacheDirectory;
    const markdownParser = parseMarkdownParts(babelConfig);
    // disable vendor
    config.optimization.splitChunks({ cacheGroups: {} });
    const demos = getDemos(context, markdownParser);
    let entry;
    if (command === 'dev') {
      // remove HtmlWebpackPlugin when run dev
      config.plugins.delete('HtmlWebpackPlugin');
      const componentEntry = {};
      demos.forEach((demo) => {
        const demoName = demo.filename;
        const demoFile = path.join('demo', `${demoName}.md`);
        componentEntry[`__Component_Dev__.${demoName}`] = demoFile;
      });
      if (adaptorEntry) {
        componentEntry.adaptor = adaptorEntry;
      }
      entry = api.processEntry(componentEntry);
      setAssetsPath(config, { js: 'js', css: 'css' });
    } else if (command === 'build') {
      entry = api.processEntry(generateEntryJs({
        template: 'index.js.hbs',
        filename: 'component-index.js',
        context,
        params: {
          demos: demos.map((demo) => ({ path: formatPathForWin(demo.filePath) })),
        },
      }));
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
        template: require.resolve('./template/index.html.hbs'),
        filename: 'index.html',
        ...readme,
        demos,
      }]);
    }
    // modify entry
    config.entryPoints.clear();
    config.merge({ entry });
    // remove CopyWebpackPlugin (component compile do not have public folder)
    config.plugins.delete('CopyWebpackPlugin');
    // add demo loader
    config.module.rule('demo-loader').test(/\.md$/i).use('demo')
      .loader(require.resolve('./loaders/componentDemoLoader'))
      .options({ parser: markdownParser });
    // modify webpack devServer
    config.devServer
      .after(demoRouter({ context, markdownParser, demos, pkg, hasAdaptor }))
      .contentBase(false);
    // add packagename to webpack alias
    config.resolve.alias
      .set(pkg.name, path.resolve(context, 'src/index'));

    // modify webpack chain for adaptor build
    if (process.env.BUILD_ADAPTOR === JSON.stringify(true) && command === 'build' && hasAdaptor) {
      config.plugins.delete('HtmlWebpackPlugin');
      // output umd
      config.output
        .library('Adaptor')
        .libraryExport('default')
        .libraryTarget('umd');
      config.output.path(path.resolve(context, 'build/adaptor'));
      config.entryPoints.clear();
      config.merge({
        entry: api.processEntry({ adaptor: path.resolve(context, 'adaptor/index.js') }),
      });
      config.externals({
        react: {
          root: 'React',
          commonjs: 'react',
          commonjs2: 'react',
          amd: 'react',
        },
        'react-dom': {
          root: 'ReactDom',
          commonjs: 'react-dom',
          commonjs2: 'react-dom',
          amd: 'react-dom',
        },
        '@alifd/next': {
          root: 'Next',
          commonjs: '@alifd/next',
          commonjs2: '@alifd/next',
          amd: '@alifd/next',
        },
        moment: {
          root: 'moment',
          commonjs: 'moment',
          commonjs2: 'moment',
          amd: 'moment',
        },
      });
    }
  });
  api.onHooks('afterBuild', () => {
    if (!process.env.BUILD_ADAPTOR) {
      // modify pkg home page
      const { name, version } = pkg;
      const pkgPath = path.resolve(context, 'package.json');
      const homepage = `${npmUtils.getUnpkgHost(name)}/${name}@${version}/build/index.html`;
      pkg.homepage = homepage;
      fse.writeJsonSync(pkgPath, pkg, {
        spaces: 2,
      });

      // component build
      buildSrc(babelConfig, context);

      if (hasAdaptor) {
        // generate adaptor index.scss
        const sassContent = resolveSassImport('main.scss', path.resolve(context, 'src'));
        fse.writeFileSync(path.resolve(context, 'build/index.scss'), sassContent, 'utf-8');
        // adaptor build
        process.env.BUILD_ADAPTOR = true;
        api.service.run();
      }
    }
  });
};
