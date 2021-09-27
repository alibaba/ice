import * as path from 'path';
import * as fse from 'fs-extra';
import { minify } from 'html-minifier';
import LoadablePlugin from '@loadable/webpack-plugin';
import getWebpackConfig from '@builder/webpack-config';
import { formatPath } from '@builder/app-helpers';
import generateStaticPages from './generateStaticPages';

const plugin = async (api): Promise<void> => {
  const { context, registerTask, getValue, onGetWebpackConfig, onHook, log, applyMethod, modifyUserConfig } = api;
  const { rootDir, command, webpack, commandArgs, userConfig } = context;
  const { outputDir, ssr } = userConfig;

  const TEMP_PATH = getValue('TEMP_PATH');
  // Note: Compatible plugins to modify configuration
  const buildDir = path.join(rootDir, outputDir);
  const serverDir = path.join(buildDir, 'server');
  const serverFilename = 'index.js';
  const serverFilePath = path.join(serverDir, serverFilename);

  // render server entry
  const templatePath = path.join(__dirname, '../src/server.ts.ejs');
  const ssrEntry = path.join(TEMP_PATH, 'plugins/ssr/server.ts');
  const routesFileExists = Boolean(applyMethod('getSourceFile', 'src/routes', rootDir));
  applyMethod('addRenderFile', templatePath, ssrEntry, { outputDir, routesPath: routesFileExists ? '@' : '.' });

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
  registerTask('ssr', webpackConfig);
  onGetWebpackConfig('ssr', (config) => {
    config.entryPoints.clear();

    config.entry('index').add(ssrEntry);

    config.target('node');

    config.name('ssr');

    config.module
      .rule('polyfill')
      .include.add(ssrEntry);

    config
      .plugin('DefinePlugin')
      .tap(([args]) => [{ ...args, 'process.env.__IS_SERVER__': true }]);

    config.plugins.delete('MiniCssExtractPlugin');
    ['scss', 'scss-module', 'css', 'css-module', 'less', 'less-module'].forEach((rule) => {
      if (config.module.rules.get(rule)) {
        config.module.rule(rule).uses.delete('MiniCssExtractPlugin.loader');
        config.module
          .rule(rule)
          .use('css-loader')
          .tap((options) => ({
            ...options,
            modules: {
              ...(options.modules || {}),
              exportOnlyLocals: true,
            },
          }));
      }
    });

    config.output
      .path(serverDir)
      .filename('[name].js')
      .publicPath('/')
      .libraryTarget('commonjs2');

    // not generate vendor
    config.optimization.splitChunks({ cacheGroups: {} });

    // in case of app with client and server code, webpack-node-externals is helpful to reduce server bundle size
    // while by bundle all dependencies, developers do not need to concern about the dependencies of server-side
    // TODO: support options to enable nodeExternals
    // empty externals added by config external
    config.externals([]);

    // remove process fallback when target is node
    config.plugins.delete('ProvidePlugin');
    // no need to generate the loadable-stats.json because it will not be used in anywhere
    config.plugins.delete('@loadable/webpack-plugin');

    async function serverRender(res, req) {
      const htmlTemplate = fse.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
      log.info('[SSR]', 'start server render');
      delete require.cache[serverFilePath];
      // eslint-disable-next-line
      const serverRender = require(serverFilePath);
      const ctx = { res, req };
      const { error, html, redirectUrl } = await serverRender.default(ctx, { htmlTemplate });

      if (redirectUrl) {
        log.info('[SSR]', `Redirect to the new path ${redirectUrl}`);
        res.redirect(302, redirectUrl);
      } else {
        if (error) {
          log.error('[SSR] Server side rendering error, downgraded to client side rendering');
          log.error(error);
        }
        log.info('[SSR] SSR success', 'output html content');
        log.verbose('[SSR] ssr html content', html);
        res.send(html);
      }
    }

    if (command === 'start') {
      const originalDevMiddleware = config.devServer.get('devMiddleware');
      config.devServer.set('devMiddleware', {
        ...originalDevMiddleware,
        writeToDisk: (filePath: string) => {
          const formattedFilePath = formatPath(filePath);
          return /(server\/.*|loadable-stats.json|index.html)$/.test(formattedFilePath);
        },
      });

      let serverReady = false;
      let httpResponseQueue = [];
      const originalDevServeBefore = config.devServer.get('onBeforeSetupMiddleware');
      config.devServer.set('onBeforeSetupMiddleware', (server) => {
        const { app } = server;
        if (typeof originalDevServeBefore === 'function') {
          originalDevServeBefore(server);
        }
        let compilerDoneCount = 0;
        server.compiler.compilers.forEach((compiler) => {
          compiler.hooks.done.tap('ssrServer', () => {
            compilerDoneCount++;
            // wait until all compiler is done
            if (compilerDoneCount === server.compiler.compilers.length) {
              serverReady = true;
              httpResponseQueue.forEach(([req, res]) => {
                serverRender(res, req);
              });
              // empty httpResponseQueue
              httpResponseQueue = [];
            }
          });
        });

        const pattern = /^\/?((?!\.(js|css|map|json|png|jpg|jpeg|gif|svg|eot|woff2|ttf|ico)).)*$/;
        app.get(pattern, async (req, res) => {
          if (serverReady) {
            serverRender(res, req);
          } else {
            httpResponseQueue.push([req, res]);
          }
        });
      });
    }

    if (command === 'build' && ssr === 'static') {
      // SSG, pre-render page in production
      const ssgTemplatePath = path.join(__dirname, './renderPages.ts.ejs');
      const ssgEntryPath = path.join(TEMP_PATH, 'plugins/ssr/renderPages.ts');
      const ssgBundlePath = path.join(serverDir, 'renderPages.js');
      applyMethod(
        'addRenderFile',
        ssgTemplatePath,
        ssgEntryPath,
        {
          outputDir,
          routesPath: routesFileExists ? '@' : '.',
        }
      );

      config.entry('renderPages').add(ssgEntryPath);

      onHook('after.build.compile', async () => {
        await generateStaticPages(buildDir, ssgBundlePath);
        await fse.remove(ssgBundlePath);
      });
    }
  });

  onHook(`after.${command}.compile`, () => {
    const htmlFilePath = path.join(buildDir, 'index.html');
    const bundle = fse.readFileSync(serverFilePath, 'utf-8');
    const html = fse.readFileSync(htmlFilePath, 'utf-8');
    const minifiedHtml = minify(html, { collapseWhitespace: true, quoteCharacter: '\'' });
    const newBundle = bundle.replace(/__ICE_SERVER_HTML_TEMPLATE__/, minifiedHtml);
    fse.writeFileSync(serverFilePath, newBundle, 'utf-8');

    // @deprecated
    // In the future, the loadable-stats.json file in the server dir will be removed because it will be used in anywhere.
    // copy web loadable-stats.json to server directory in order to be compatible
    const statsFileName = 'loadable-stats.json';
    fse.copyFileSync(path.join(buildDir, statsFileName), path.join(serverDir, statsFileName));
  });
};

export default plugin;
