import { Plugin, createServer } from 'vite';
import * as fse from 'fs-extra';
import { join } from 'path';

const vitePluginSSR = (ssrEntry: string, rootDir: string): Plugin => {
  let config;
  return {
    name: 'vite-plugin-ssr',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    configureServer: async (server) => {
      const { resolve } = config;
      const vite = await createServer({
        resolve,
        root: rootDir,
        // @ts-ignore
        ssr: {
          externals: ['prop-types']
        },
        server: {
          middlewareMode: 'ssr',
          watch: {
            usePolling: true,
            interval: 100
          },
        }
      });

      // 前置中间件
      server.middlewares.use(vite.middlewares);

      server.middlewares.use(async (req, res) => {
        const url = req.originalUrl;
        
        // dev
        let template = fse.readFileSync(join(rootDir, 'public', 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        const renderPage = (await vite.ssrLoadModule(ssrEntry)).renderPage;

        const context = {};
        const appHtml = await renderPage(url, context);

        // if (context.url) {
        // // Somewhere a `<Redirect>` was rendered
        //   // return res.redirect(301, context.url);
        //   return res.redirect(301, context.url);
        // }
        console.log('appHTMl ===>', appHtml, template);
      });
    }
  };
};

export default vitePluginSSR;
