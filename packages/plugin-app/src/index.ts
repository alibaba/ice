import path from 'path';
import chalk from 'chalk';
import type { Plugin } from '@ice/types';
import openBrowser from './utils/openBrowser.js';
import { setupRenderServer } from './ssr/server.js';
import generateHtml from './ssr/generateHtml.js';

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

  const outputDir = path.join(rootDir, 'build');
  const serverEntry = path.join(outputDir, 'server/entry.mjs');
  const routeManifest = path.join(rootDir, '.ice/route-manifest.json');

  // server entry must build after client task, because it needs assets manifest
  onHook(`after.${command as 'start' | 'build'}.compile`, async ({ esbuildCompile }) => {
    // TODO: watch file changes and rebuild
    await esbuildCompile({
      entryPoints: [path.join(rootDir, '.ice/entry.server')],
      outdir: path.join(outputDir, 'server'),
      // platform: 'node',
      format: 'esm',
      outExtension: { '.js': '.mjs' },
      // FIXME: https://github.com/ice-lab/ice-next/issues/27
      external: process.env.JEST_TEST === 'true' ? [] : ['./node_modules/*', 'react'],
    }, { isServer: true });
  });

  // generator html
  onHook('after.build.compile', async () => {
    await generateHtml({
      outDir: outputDir,
      entry: serverEntry,
      routeManifest,
    });
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
    // assets manifest will generate after client compile
    onHook('after.start.compile', ({ urls, isFirstCompile }: any) => {
      if (isFirstCompile) {
        openBrowser(urls.localUrlForBrowser);
      }
    });
  }

  registerTask('web', {
    mode,
    outputDir,
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
          entry: serverEntry,
          routeManifest,
        }),
      });

      return middlewares;
    },
   });
};

export default plugin;
