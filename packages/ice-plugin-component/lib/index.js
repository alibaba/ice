const path = require('path');
const fse = require('fs-extra');
const { getPkgJSONSync } = require('./utils/pkgJson');
const getDemoDir = require('./utils/getDemoDir');
const getDemos = require('./utils/getDemos');
const configBabel = require('./utils/configBabel');
const { parseMarkdownParts } = require('./compile/component/markdownHelper');
const buildSrc = require('./compile/component/buildSrc');
const modifyPkgHomePage = require('./compile/component/modifyPkgHomePage');
const ComponentStyleGenerator = require('./compile/fusion/componentStyleGenerator');
const resolveSassImport = require('./compile/fusion/resolveSassImport');
const baseConfig = require('./configs/base');
const devConfig = require('./configs/dev');
const buildConfig = require('./configs/build');
const adaptorBuildConfig = require('./configs/adaptorBuild');

module.exports = (api, opts = {}) => {
  const { command, context } = api.service;
  const { type = 'fusion' } = opts;
  const pkg = getPkgJSONSync(context);
  // store babel config
  let babelConfig;
  // check adaptor folder
  const hasAdaptor = fse.existsSync(path.join(context, 'adaptor')) && type === 'fusion';

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
    const demoDir = getDemoDir(context);
    const demos = getDemos(path.join(context, demoDir), markdownParser);
    const params = { markdownParser, demoDir, demos, context, pkg, hasAdaptor };
    baseConfig(config, params);
    if (command === 'dev') {
      // component dev
      devConfig(config, params);
    } else if (command === 'build') {
      // component build
      buildConfig(config, params);
      // adaptor build, only effects when set process.env.BUILD_ADAPTOR is true
      if (process.env.BUILD_AGAIN === JSON.stringify(true) && hasAdaptor) {
        adaptorBuildConfig(config, params);
      }
    }
  });

  // flag for run build again, only excute at the first time of load this plugin
  if (!process.env.BUILD_AGAIN) {
    // build src and umd adpator after demo build
    api.onHooks('afterBuild', () => {
      process.env.BUILD_AGAIN = true;
      // component buildSrc
      buildSrc({ babelConfig, context, log: api.log });
      modifyPkgHomePage(pkg, context);

      if (type === 'fusion') {
        const styleGenerator = new ComponentStyleGenerator({
          cwd: context,
          destPath: path.join(context, 'lib'),
          absoulte: false,
        });

        styleGenerator.writeStyleJSSync();
        api.log.info('Generated style.js');

        styleGenerator.writeIndexScssSync();
        api.log.info('Generated index.scss');
      }

      if (hasAdaptor) {
        // generate adaptor index.scss
        const sassContent = resolveSassImport('main.scss', path.resolve(context, 'src'));
        fse.writeFileSync(path.resolve(context, 'build/index.scss'), sassContent, 'utf-8');
        // adaptor build
        api.service.reRun();
      }
    });
  }
};
