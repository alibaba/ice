import * as path from 'path';
import type { Plugin } from '@ice/types';
import generateHTML from './ssr/generateHTML.js';
import { setupRenderServer } from './ssr/serverRender.js';

const webPlugin: Plugin = ({ registerTask, context, onHook }) => {
  const { command, rootDir, userConfig } = context;
  const { ssg = true, ssr = true } = userConfig;
  const outputDir = path.join(rootDir, 'build');
  const routeManifest = path.join(rootDir, '.ice/route-manifest.json');
  const serverEntry = path.join(outputDir, 'server/entry.mjs');
  let serverCompiler = async () => '';
  onHook(`before.${command as 'start' | 'build'}.run`, async ({ esbuildCompile }) => {
    serverCompiler = async () => {
      await esbuildCompile({
        entryPoints: [path.join(rootDir, '.ice/entry.server')],
        outdir: path.join(outputDir, 'server'),
        // platform: 'node',
        format: 'esm',
        outExtension: { '.js': '.mjs' },
      });
      // timestamp for disable import cache
      return `${serverEntry}?version=${new Date().getTime()}`;
    };
  });
  onHook('after.build.compile', async () => {
    await serverCompiler();
    await generateHTML({
      outDir: outputDir,
      entry: serverEntry,
      routeManifest,
      ssg,
      ssr,
    });
  });
  const mode = command === 'start' ? 'development' : 'production';
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
          serverCompiler,
          routeManifest,
          ssg,
          ssr,
        }),
      });

      return middlewares;
    },
  });
};

export default webPlugin;
