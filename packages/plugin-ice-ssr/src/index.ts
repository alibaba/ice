import * as path from 'path';
import * as fse from 'fs-extra';
import LoadablePlugin from '@loadable/webpack-plugin';
import getWebpackConfig from '@builder/webpack-config';
import { formatPath } from '@builder/app-helpers';
import type { IPlugin } from 'build-scripts';
import webpackNodeExternals = require('webpack-node-externals');
import generateStaticPages from './generateStaticPages';
import vitePluginSSR from './vite/ssrPlugin';
import ssrBuild from './vite/ssrBuild';
import replaceHtmlContent from './replaceHtmlContent';

interface NodeExternals {
  excludes?: string[];
}

const plugin: IPlugin = async (api): Promise<void> => {
  const { context, registerTask, getValue, onGetWebpackConfig, onHook, log, applyMethod, modifyUserConfig, registerUserConfig } = api;
  // Register nodeExternals in build.json
  registerUserConfig({
    name: 'nodeExternals',
    validation: (val) => {
      return typeof val === 'boolean' || typeof val === 'object';
    }
  });

  const { rootDir, command, webpack, commandArgs, userConfig } = context;
  const { outputDir, ssr } = userConfig;
  const nodeExternals = userConfig.nodeExternals as NodeExternals;

  const TEMP_PATH = getValue<string>('TEMP_PATH');
  // Note: Compatible plugins to modify configuration
  const buildDir = path.join(rootDir, outputDir as string);
  const serverDir = path.join(buildDir, 'server');
  const serverFilename = 'index.js';
  const serverFilePath = path.join(serverDir, serverFilename);

  // render server entry
  const templatePath = path.join(__dirname, './server.ts.ejs');
  const ssrEntry = path.join(TEMP_PATH, 'plugins/ssr/server.ts');
  const ssgEntry = path.join(TEMP_PATH, 'plugins/ssr/renderPage.ts');
  const routesFileExists = Boolean(applyMethod('getSourceFile', 'src/routes', rootDir));
  applyMethod('addRenderFile', path.join(__dirname, '../src/env.ts'), path.join(TEMP_PATH, 'plugins/ssr/env.ts'));
  const renderProps = {
    outputDir,
    routesPath: routesFileExists ? '@' : '../..',
    disableLoadable: !!userConfig.vite,
    // 仅在 vite 的 dev 模式下，需要指定 env，build 阶段 process.env.__IS_SERVER__ 会被替换成布尔值
    importEnv: !!userConfig.vite && command !== 'build',
  };
  applyMethod('addRenderFile', templatePath, ssrEntry, renderProps);
  if (ssr === 'static') {
    applyMethod('addRenderFile', path.join(__dirname, './renderPages.ts.ejs'), ssgEntry, renderProps);
  }

  if (userConfig.vite) {

    // vite 模式下直接使用 process.env.__IS_SERVER__ 的变量，如果注册即便是将会进行字符串替换
    if (command === 'start') {
      onGetWebpackConfig((config) => {
        config
          .plugin('DefinePlugin')
          .tap(([args]) => {
            delete args['process.env.__IS_SERVER__'];
            return [args];
          });
      });
    }
    modifyUserConfig('vite.plugins', [vitePluginSSR(ssrEntry)], { deepmerge: true });
    onHook('after.build.compile', async ({ config }) => {
      // dev 阶段直接使用 ssrLoadModule 实时加载并执行
      // build 服务未实现类似 ssrLoadModule 的能力，需要将 server 源码进行打包
      await ssrBuild(config, { ssrEntry, ssgEntry, ssr: ssr as string });
      if (ssr === 'static') {
        await generateStaticPages(buildDir, serverFilePath);
      }
    });
    return;
  }

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
    // empty externals added by config external
    config.externals(
      nodeExternals ?
        [
          webpackNodeExternals({
            allowlist: [
              // inner deps need to be bundled
              /^create-app-shared/,
              /^react-app-renderer/,
              /^@ice\/runtime/,
              ...[nodeExternals?.excludes || []].map(exclude => RegExp(`^${exclude}`)),
            ]
          })
        ] : []
    );

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
      const setupMiddlewares = config.devServer.get('setupMiddlewares');
      config.devServer.set('setupMiddlewares', (originalMiddlewares, server) => {
        const { app } = server;
        let middlewares = originalMiddlewares;
        if (typeof setupMiddlewares === 'function') {
          middlewares = setupMiddlewares(originalMiddlewares, server);
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
        return middlewares;
      });
    }

    if (command === 'build' && ssr === 'static') {
      // SSG, pre-render page in production
      const ssgBundlePath = path.join(serverDir, 'renderPages.js');
      config.entry('renderPages').add(ssgEntry);

      onHook('after.build.compile', async () => {
        await generateStaticPages(buildDir, ssgBundlePath);
        await fse.remove(ssgBundlePath);
      });
    }
  });

  onHook(`after.${command}.compile`, () => {
    const htmlFilePath = path.join(buildDir, 'index.html');
    replaceHtmlContent(htmlFilePath, serverFilePath);
  });
};

export default plugin;
