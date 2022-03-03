import path from 'path';
import fs from 'fs';
import type { Plugin } from '@ice/types';
import { setupRenderServer } from './ssr/server.js';
import { buildEntry } from './ssr/build.js';
import renderDocument from './ssr/renderDocument.js';

const plugin: Plugin = ({ registerTask, context, onHook }) => {
  const { command, rootDir } = context;
  const mode = command === 'start' ? 'development' : 'production';

  // mock routeManifest
  const routeManifest = {
    '/': '/src/pages/index',
  };

  onHook(`before.${command as 'start' | 'build'}.run`, async ({ transformPlugins, config }) => {
    // TODO: watch file changes and rebuild
    await buildEntry({
      rootDir,
      outdir: 'build',
      entry: path.join(rootDir, 'src/document.tsx'),
      // alias will be formatted as Record<string, string>
      // TODO consider with alias to false
      alias: (Array.isArray(config) ? config[0] : config).resolve?.alias as Record<string, string>,
      plugins: transformPlugins,
    });

    if (command === 'build') {
      // generator html to outputDir
      const htmlContent = renderDocument({ rootDir, documentPath: 'build/document.js' });
      fs.writeFileSync(path.join(rootDir, 'build/index.html'), htmlContent);
    }
  });

  registerTask('web', {
    mode,
    middlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      middlewares.push({
        name: 'document-render-server',
        middleware: setupRenderServer({
          rootDir,
          routeManifest,
        }),
      });

      return middlewares;
    },
   });
};

export default plugin;