import * as path from 'path';
import { fileURLToPath } from 'url';
import consola from 'consola';
import chalk from 'chalk';
import type { Plugin } from '@ice/types';
import generateManifest from './generateManifest.js';
import createPHAMiddleware from './phaMiddleware.js';
import { templateFile } from './constants.js';

import type { Manifest } from './types.js';

export type Compiler = (options: {
  entry: string;
  outfile: string;
  timestamp?: boolean;
  removeExportExprs?: string[];
}) => Promise<string>;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface PluginOptions {
  template: boolean;
}

const plugin: Plugin<PluginOptions> = ({ onGetConfig, onHook, context, generator }, options) => {
  const { template } = options || {};
  const { command, rootDir } = context;
  // get variable blows from task config
  let compiler: Compiler;
  let publicPath: string;
  let outputDir: string;
  let urlPrefix: string;

  generator.addRenderFile(path.join(__dirname, '../template/manifest.ts'), path.join(rootDir, templateFile));
  // get server compiler by hooks
  onHook(`before.${command as 'start' | 'build'}.run`, async ({ serverCompiler, taskConfigs, urls }) => {
    const taskConfig = taskConfigs.find(({ name }) => name === 'web').config;
    outputDir = taskConfig.outputDir;
    publicPath = taskConfig.publicPath || '/';
    // process.env.URL_PREFIX is defined by cloud environment such as DEF plugin
    urlPrefix = command === 'start' ? urls.lanUrlForTerminal : process.env.URL_PREFIX;

    compiler = async (options) => {
      const { entry, outfile, removeExportExprs, timestamp = true } = options;
      await serverCompiler({
        entryPoints: [entry],
        format: 'esm',
        outfile,
        inject: [],
      }, removeExportExprs ? { removeExportExprs } : null);
      return `${outfile}${timestamp ? `?version=${new Date().getTime()}` : ''}`;
    };
  });

  onHook('after.build.compile', async ({ serverEntry }) => {
    await generateManifest({
      rootDir,
      outputDir,
      compiler,
      parseOptions: {
        publicPath,
        urlPrefix,
        serverEntry,
        template,
      },
    });
  });

  onHook('after.start.compile', async ({ urls }) => {
    // log out pha dev urls
    const lanUrl = urls.lanUrlForTerminal;
    const phaManifestPath = path.join(rootDir, templateFile);
    const manifestOutfile = path.join(outputDir, 'pha-manifest.mjs');
    const phaManifest: Manifest = (await import(
      await compiler({ entry: phaManifestPath, outfile: manifestOutfile })
    )).default;
    const phaDevUrls = [];
    if (phaManifest?.tabBar) {
      phaDevUrls.push(`${lanUrl}manifest.json`);
    } else if (phaManifest?.routes?.length > 0) {
      phaManifest.routes.forEach((route) => {
        if (typeof route === 'string') {
          phaDevUrls.push(`${lanUrl}${route}-manifest.json`);
        } else if (typeof route?.frames![0] === 'string') {
          phaDevUrls.push(`${lanUrl}${route.frames[0]}-manifest.json`);
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
        parseOptions: {
          publicPath,
          urlPrefix,
          template,
        },
      });
      // add pha middleware after server-compile
      middlewares.splice(insertIndex + 1, 0, {
        name: 'pha-manifest',
        middleware: phaMiddleware,
      });
      return currentMiddlewares;
    };
    return config;
  });
};

export default (options: PluginOptions) => ({
  name: '@ice/plugin-pha',
  plugin: (api) => plugin(api, options),
});