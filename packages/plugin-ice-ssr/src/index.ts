import * as path from 'path';
import LoadablePlugin from '@loadable/webpack-plugin';
import getWebpackConfig from '@builder/webpack-config';
import setSSGWebpackConfig from './setSSGWebpackConfig';
import setSSRWebpackConfig from './setSSRWebpackConfig';

const plugin = async (api): Promise<void> => {
  const { context, onGetWebpackConfig, modifyUserConfig } = api;
  const { rootDir, command, webpack, commandArgs, userConfig } = context;
  const { outputDir, ssr } = userConfig;

  // Note: Compatible plugins to modify configuration
  const buildDir = path.join(rootDir, outputDir);
  const serverDir = path.join(buildDir, 'server');

  // const serverFilename = 'index.js';
  // const serverFilePath = path.join(serverDir, serverFilename);

  const mode = command === 'start' ? 'development' : 'production';

  const webpackConfig = getWebpackConfig(mode);
  // config DefinePlugin out of onGetWebpackConfig, so it can be modified by user config
  webpackConfig
    .plugin('DefinePlugin')
    .use(webpack.DefinePlugin, [{
      'process.env.APP_MODE': JSON.stringify(commandArgs.mode || command),
      'process.env.SERVER_PORT': JSON.stringify(commandArgs.port),
    }]);

  onGetWebpackConfig((config) => {
    if (config.plugins.get('HtmlWebpackPlugin')) {
      config
        .plugin('HtmlWebpackPlugin')
        .tap(([args]) => {
          return [{
            ...args,
            // will add assets by @loadable/component
            inject: false,
          }];
        });
    }

    config.plugin('@loadable/webpack-plugin').use(LoadablePlugin);
  });

  modifyUserConfig('babelPlugins',
    [
      ...(userConfig.babelPlugins as [] || []),
      require.resolve('./babelPluginReplaceLazy'),
      '@loadable/babel-plugin',
    ]
  );

  if (ssr) {
    // ssr webpack node config
    setSSRWebpackConfig({ api, mode, serverDir, buildDir });
  } else {
    // ssg webpack node config
    setSSGWebpackConfig({ api, mode, serverDir, buildDir });
  }

  // onHook(`after.${command}.compile`, () => {
  //   const htmlFilePath = path.join(buildDir, 'index.html');
  //   const bundle = fse.readFileSync(serverFilePath, 'utf-8');
  //   const html = fse.readFileSync(htmlFilePath, 'utf-8');
  //   const minifiedHtml = minify(html, { collapseWhitespace: true, quoteCharacter: '\'' });
  //   const newBundle = bundle.replace(/__ICE_SERVER_HTML_TEMPLATE__/, minifiedHtml);
  //   fse.writeFileSync(serverFilePath, newBundle, 'utf-8');
  // });
};

export default plugin;
