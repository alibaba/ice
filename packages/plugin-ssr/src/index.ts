import * as path from 'path';
import * as fse from 'fs-extra';
import * as ejs from 'ejs';
import { minify } from 'html-minifier';
import { getWebpackConfig } from 'build-scripts-config';

const plugin = async (api): Promise<void> => {
  const { context, registerTask, getValue, onGetWebpackConfig, onHook, log } = api;
  const { rootDir, command, webpack, userConfig, commandArgs } = context;
  const ICE_TEMP = getValue('ICE_TEMP');
  const ssrEntry = path.join(ICE_TEMP, 'server.ts');
  // Note: Compatible plugins to modify configuration
  const buildDir = path.join(rootDir, userConfig.outputDir);
  const serverDir = path.join(buildDir, 'server');
  const serverFilename = 'index.js';

  const templatePath = path.join(__dirname, '../src/server.ts.ejs');
  const templateContent = fse.readFileSync(templatePath, 'utf-8');
  const content = ejs.render(templateContent);
  fse.ensureDirSync(path.dirname(ssrEntry));
  fse.writeFileSync(ssrEntry, content, 'utf-8');

  const mode = command === 'start' ? 'development' : 'production';
  const webpackConfig = getWebpackConfig(mode);
  // config DefinePlugin out of onGetWebpackConfig, so it can be modified by user config
  webpackConfig
    .plugin('DefinePlugin')
    .use(webpack.DefinePlugin, [{
      'process.env.APP_MODE': JSON.stringify(commandArgs.mode || command),
      'process.env.SERVER_PORT': JSON.stringify(commandArgs.port),
    }]);
  registerTask('ssr', webpackConfig);
  onGetWebpackConfig('ssr', (config) => {
    config.entryPoints.clear();

    config.entry('server').add(ssrEntry);

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
            onlyLocals: true
          }));
      }
    });

    config.output
      .path(serverDir)
      .filename(serverFilename)
      .publicPath('/')
      .libraryTarget('commonjs2');

    // in case of app with client and server code, webpack-node-externals is helpful to reduce server bundle size
    // while by bundle all dependencies, developers do not need to concern about the dependencies of server-side
    // TODO: support options to enable nodeExternals
    // empty externals added by config external
    config.externals([]);

    async function serverRender(res, req) {
      const htmlTemplate = fse.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
      console.log('[SSR]', 'start server render');
      const requirePath = path.join(serverDir, serverFilename);
      delete require.cache[requirePath];
      // eslint-disable-next-line
      const serverRender = require(requirePath)
      const { html, error } = await serverRender.default({ pathname: req.path, htmlTemplate });
      if (error) {
        log.error('[SSR] Server side rendering error, downgraded to client side rendering');
        log.error(error);
      }
      console.log('[SSR]', `output html content\n${html}\n`);
      res.send(html);
    }
    if (command === 'start') {
      config.devServer
        .hot(true)
        .writeToDisk((filePath) => {
          return /(server\/index\.js|index.html)$/.test(filePath);
        });
      let serverReady = false;
      let httpResponseQueue = [];
      const originalDevServeBefore = config.devServer.get('before');
      config.devServer.set('before', (app, server) => {
        if (typeof originalDevServeBefore === 'function') {
          originalDevServeBefore(app, server);
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
            console.log('[SSR]', 'pending request until server is ready');
            httpResponseQueue.push([req, res]);
          }
        });
      });
    }
  });

  onHook('after.build.compile', () => {
    const serverFilePath = path.join(serverDir, serverFilename);
    const htmlFilePath = path.join(buildDir, 'index.html');
    const bundle = fse.readFileSync(serverFilePath, 'utf-8');
    const html = fse.readFileSync(htmlFilePath, 'utf-8');
    // eslint-disable-next-line quotes
    const minifedHtml = minify(html, { collapseWhitespace: true, quoteCharacter: "'" });
    const newBundle = bundle.replace(/__ICE_SERVER_HTML_TEMPLATE__/, minifedHtml);
    fse.writeFileSync(serverFilePath, newBundle, 'utf-8');
  });
};

export default plugin;
