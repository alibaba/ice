import * as path from 'path';
import * as fse from 'fs-extra';
import getWebpackConfig from '@builder/webpack-config';
import { formatPath } from '@builder/app-helpers';
import SSGWebpackPlugin from './SSGWebpackPlugin';

export default ({ api, serverDir, buildDir, mode }) => {
  const { context, registerTask, getValue, onGetWebpackConfig, applyMethod, log, onHook } = api;
  const { rootDir, command, webpack, userConfig } = context;
  const { outputDir, publicPath = '/', devPublicPath = '/' } = userConfig;

  const TEMP_PATH = getValue('TEMP_PATH');
  const PROJECT_TYPE = getValue('PROJECT_TYPE');

  const renderFilename = 'ssg.js';
  const renderFilePath = path.join(serverDir, renderFilename);

  // render ssg entry
  const templatePath = path.join(__dirname, './ssg.ts.ejs');
  const ssgEntry = path.join(TEMP_PATH, 'ssg.ts');
  const routesFileExists = fse.existsSync(path.join(rootDir, 'src', `routes.${PROJECT_TYPE}`));
  applyMethod(
    'addRenderFile',
    templatePath,
    ssgEntry,
    {
      outputDir,
      routesPath: routesFileExists ? '@' : '.',
      publicPath: command === 'build' ? publicPath : devPublicPath
    });

  const webpackConfig = getWebpackConfig(mode);
  registerTask('ssg', webpackConfig);

  onGetWebpackConfig('ssg', (config) => {
    config.entryPoints.clear();

    config.entry('server').add(ssgEntry);

    config.target('node');

    config.name('ssg');

    config.module
      .rule('polyfill')
      .include.add(ssgEntry);

    config
      .plugin('DefinePlugin')
      .use(webpack.DefinePlugin)
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
      .filename(renderFilename)
      .publicPath('/')
      .libraryTarget('commonjs2');

    // in case of app with client and server code, webpack-node-externals is helpful to reduce server bundle size
    // while by bundle all dependencies, developers do not need to concern about the dependencies of server-side
    // TODO: support options to enable nodeExternals
    // empty externals added by config external
    config.externals([]);

    // remove process fallback when target is node
    config.plugins.delete('ProvidePlugin');

    if (command === 'build') {
      config
        .plugin('SSGWebpackPlugin')
        .after('HtmlWebpackPlugin')
        .use(SSGWebpackPlugin, [
          {
            renderFilePath,
            buildDir,
            command
          }
        ]);
    }

    async function serverRender(res, req) {
      const htmlTemplate = fse.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
      log.info('[SSG]', 'start server render');
      delete require.cache[renderFilePath];
      // eslint-disable-next-line
      const render = require(renderFilePath);
      const ctx = { res, req };
      const { error, html, redirectUrl } = await render.default({ ctx, htmlTemplate, command });

      if (redirectUrl) {
        log.info('[SSG]', `Redirect to the new path ${redirectUrl}`);
        res.redirect(302, redirectUrl);
      } else {
        if (error) {
          log.error('[SSG] Server side rendering error, downgraded to client side rendering');
          log.error(error);
        } else {
          log.info('[SSG] SSG success', 'output html content');
        }
        log.verbose('[SSG] SSG html content', html);
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

  });
};
