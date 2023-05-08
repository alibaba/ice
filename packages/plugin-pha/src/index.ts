import * as path from 'path';
import { fileURLToPath } from 'url';
import consola from 'consola';
import chalk from 'chalk';
import type { Plugin, GetAppConfig, GetRoutesConfig, GetDataloaderConfig, ServerCompiler } from '@ice/app/types';
import generateManifest, { getAppWorkerPath } from './generateManifest.js';
import createPHAMiddleware from './phaMiddleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export type Compiler = (options: {
  entry: string;
  outfile: string;
  minify?: boolean;
  timestamp?: boolean;
  removeCode?: boolean;
}, buildOptions: Parameters<ServerCompiler>[1]) => Promise<string>;

interface PluginOptions {
  template?: boolean;
  preload?: boolean;
  dataLoader?: {
    // Dynamic of dataLoader config will build the dataLoader into the app worker.
    useAppWorker: boolean;
  };
}

function getDevPath(url: string): string {
  return url.startsWith('http') ? `${new URL(url).origin}/` : url;
}

const plugin: Plugin<PluginOptions> = (options) => ({
  name: '@ice/plugin-pha',
  setup: ({ onGetConfig, onHook, context, excuteServerEntry, generator, getAllPlugin, createLogger }) => {
    if (!excuteServerEntry) {
      throw new Error('PHA plugin requires excuteServerEntry, Please upgrade @ice/app to latest version (>= 3.1.5).');
    }
    const {
      template = true,
      preload = false,
      dataLoader = {
        useAppWorker: true,
      },
    } = options || {};

    const { command, rootDir } = context;

    const logger = createLogger('PHA');

    // Get variable blows from task config.
    let compiler: Compiler;
    let publicPath: string;
    let outputDir: string;
    let urlPrefix: string;
    let getAppConfig: GetAppConfig;
    let getRoutesConfig: GetRoutesConfig;
    let getDataloaderConfig: GetDataloaderConfig;

    generator.addRouteTypes({
      specifier: ['PageConfig'],
      alias: { PageConfig: 'PHAPageConfig' },
      type: true,
      source: '@ice/plugin-pha/types',
    });

    // TODO: get route manifest by API.
    const routeManifest = path.join(rootDir, '.ice', 'route-manifest.json');
    // Get server compiler by hooks
    onHook(`before.${command as 'start' | 'build'}.run`, async ({ serverCompiler, taskConfigs, urls = {}, ...restAPI }) => {
      const taskConfig = taskConfigs.find(({ name }) => name === 'web').config;
      outputDir = path.isAbsolute(taskConfig.outputDir)
        ? taskConfig.outputDir : path.join(rootDir, taskConfig.outputDir);

      getAppConfig = restAPI.getAppConfig;
      getRoutesConfig = restAPI.getRoutesConfig;
      getDataloaderConfig = restAPI.getDataloaderConfig;

      const appWorkerPath = await getAppWorkerPath({
        rootDir,
        getAppConfig,
      });

      generator.addRenderFile(path.join(__dirname, '../template/appWorker.ejs'), 'appWorker.ts', {
        appWorkerPath,
        dynamic: dataLoader.useAppWorker,
      });

      // Need absolute path for pha dev.
      publicPath = command === 'start' ? getDevPath(urls.lanUrlForTerminal || urls.localUrlForTerminal) : (taskConfig.publicPath || '/');

      // process.env.DEPLOY_PATH is defined by cloud environment such as DEF plugin.
      urlPrefix = command === 'start' ? urls.lanUrlForTerminal : process.env.DEPLOY_PATH;

      compiler = async (options, buildOptions) => {
        const { entry, outfile, minify = false } = options;
        await serverCompiler({
          target: 'es2015',
          entryPoints: [entry],
          format: 'esm',
          outfile,
          minify,
        }, buildOptions);
        return `${outfile}`;
      };
    });

    onHook('after.build.compile', async () => {
      await generateManifest({
        rootDir,
        outputDir,
        compiler,
        getAllPlugin,
        getAppConfig,
        getRoutesConfig,
        getDataloaderConfig,
        parseOptions: {
          excuteServerEntry,
          publicPath,
          urlPrefix,
          template,
          preload,
          routeManifest,
        },
        logger,
      });
    });

    onHook('after.start.compile', async ({ isSuccessful, isFirstCompile, urls }) => {
      // Only print logout message once when build is successful.
      // See also @ice/app -> plugins/web.ts
      if (isSuccessful && isFirstCompile) {
        // Log out pha dev urls.
        const lanUrl = urls.lanUrlForTerminal;
        const appConfig = await getAppConfig(['phaManifest']);
        const { phaManifest } = appConfig || {};
        const phaDevUrls = [];
        if (phaManifest?.tabBar) {
          phaDevUrls.push(`${lanUrl}manifest.json?pha=true`);
        } else if (phaManifest?.routes?.length > 0) {
          phaManifest.routes.forEach((route) => {
            if (typeof route === 'string') {
              phaDevUrls.push(`${lanUrl}${route}-manifest.json?pha=true`);
            } else if (typeof route?.frames![0] === 'string') {
              phaDevUrls.push(`${lanUrl}${route.frames[0]}-manifest.json?pha=true`);
            }
          });
        }
        let logoutMessage = '\n';
        logoutMessage += chalk.green(' Serve PHA Manifest at:\n');
        phaDevUrls.forEach((url) => {
          logoutMessage += `\n   ${chalk.underline.white(url)}`;
        });
        if (phaDevUrls.length > 0) {
          consola.log(`${logoutMessage}\n`);
        }
      }
    });

    onGetConfig('web', (config) => {
      const customMiddlewares = config.middlewares;
      config.middlewares = (middlewares, devServer) => {
        const currentMiddlewares = customMiddlewares ? customMiddlewares(middlewares, devServer) : middlewares;
        const insertIndex = currentMiddlewares.findIndex(({ name }) => name === 'server-compile');
        const phaMiddleware = createPHAMiddleware({
          compiler,
          rootDir,
          outputDir,
          getAppConfig,
          getRoutesConfig,
          getAllPlugin,
          getDataloaderConfig,
          parseOptions: {
            publicPath,
            urlPrefix,
            template,
            preload,
            routeManifest,
            excuteServerEntry,
          },
          logger,
        });

        // Add pha middleware after server-compile.
        middlewares.splice(insertIndex + 1, 0, {
          name: 'pha-manifest',
          middleware: phaMiddleware,
        });
        return currentMiddlewares;
      };
      return config;
    });
  },
});

export default plugin;
