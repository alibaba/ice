import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import type { Plugin } from '@ice/types';
import openBrowser from './utils/openBrowser.js';
import { setupRenderServer } from './ssr/server.js';
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

  let outDir: string;

  onHook(`before.${command as 'start' | 'build'}.run`, async ({ esbuildCompile, taskConfig }) => {
    outDir = taskConfig.outputDir;
    // TODO: watch file changes and rebuild
    await esbuildCompile({
      entryPoints: [path.join(rootDir, 'src/document.tsx')],
      outdir: outDir,
      platform: 'node',
      external: ['./node_modules/*'],
    }, { isServer: true });

    if (command === 'build') {
      // generator html to outputDir
      const htmlContent = renderDocument(path.join(taskConfig.outputDir, 'document.js'));
      fs.writeFileSync(path.join(taskConfig.outputDir, 'index.html'), htmlContent);
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