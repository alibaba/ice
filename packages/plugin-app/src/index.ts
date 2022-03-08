import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import openBrowser from './utils/openBrowser.js';
import type { Plugin } from '@ice/types';
import { setupRenderServer } from './ssr/server.js';
import { buildEntry } from './ssr/build.js';
import renderDocument from './ssr/renderDocument.js';

// TODO: register more cli options
const cliOptions = [
  {
    name: 'disableOpen',
    commands: ['start'],
  },
];

const plugin: Plugin = ({ registerTask, context, onHook, registerCliOption }) => {
  const { command, rootDir, commandArgs } = context;
  const mode = command === 'start' ? 'development' : 'production';

  registerCliOption(cliOptions);

  // mock routeManifest
  const routeManifest = {
    '/': '/src/pages/index',
  };

  let outDir;

  onHook(`before.${command as 'start' | 'build'}.run`, async ({ getTransformPlugins, config }) => {
    outDir = config.outputDir;
    config.isServer = true;
    // TODO: watch file changes and rebuild
    await buildEntry({
      outDir,
      entry: path.join(rootDir, 'src/document.tsx'),
      // alias will be formatted as Record<string, string>
      // TODO consider with alias to false
      alias: config.alias,
      plugins: getTransformPlugins(config),
    });

    if (command === 'build') {
      // generator html to outputDir
      const htmlContent = renderDocument(path.join(config.outputDir, 'document.js'));
      fs.writeFileSync(path.join(config.outputDir, 'index.html'), htmlContent);
    }
  });

  onHook('after.start.compile', ({ urls, stats, messages }) => {
    // 包含错误时不打印 localUrl 和 assets 信息
    if (!messages.errors.length) {
      if (!commandArgs.disableAssets) {
        console.log(stats.toString({
          errors: false,
          warnings: false,
          colors: true,
          assets: true,
          chunks: false,
          entrypoints: false,
          modules: false,
          timings: false,
        }));
      }

      console.log();
      console.log(chalk.green(' Starting the development server at:'));
      if (process.env.CLOUDIDE_ENV) {
        console.log('   - IDE server: ', `https://${process.env.WORKSPACE_UUID}-${commandArgs.port}.${process.env.WORKSPACE_HOST}`);
      } else {
        console.log('   - Local  : ', chalk.underline.white(urls.localUrlForBrowser));
        console.log('   - Network: ', chalk.underline.white(urls.lanUrlForTerminal));
      }
      console.log();
    }
  });

  if (!commandArgs.disableOpen) {
    onHook('after.start.devServer', ({ urls }: any) => {
      openBrowser(urls.localUrlForBrowser);
    });
  }

  registerTask('web', {
    mode,
    outputDir: path.join(rootDir, 'build'),
    alias: {
      ice: path.join(rootDir, '.ice', 'index.ts'),
      '@': path.join(rootDir, 'src'),
    },
    middlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      middlewares.push({
        name: 'document-render-server',
        middleware: setupRenderServer({
          outDir,
          routeManifest,
        }),
      });

      return middlewares;
    },
   });
};

export default plugin;