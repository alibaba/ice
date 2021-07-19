import { ViteDevServer, Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

interface HtmlOption {
  entry: string
  temp: string
  rootDir: string
}

/**
 * 1. public/index.html -> /index.html
 * 2. add script entry
 */
export const indexHtmlPlugin = ({ entry, temp, rootDir }: HtmlOption): Plugin => {
  return {
    name: 'index-html-plugin',
    transformIndexHtml: {
      enforce: 'pre',
      transform: (html) => ({
        html,
        tags: [{
          tag: 'script',
          injectTo: 'body',
          attrs: {
            type: 'module',
            src: path.resolve('/', entry)
          }
        }]
      })
    },
    configureServer(app: ViteDevServer) {
      return () => {
        app.middlewares.use(async (req, res, next) => {
          const defaultUrl = path.resolve(rootDir, 'index.html');
          const isExist = fs.existsSync(defaultUrl);

          if (isExist) {
            next();
            return;
          }

          if (!req.originalUrl.endsWith('.html') && req.originalUrl !== '/') {
            req.url = `/${temp}/${req.originalUrl}.html`;
          } else if (req.url === '/index.html') {
            req.url = `/${temp}/${req.url}`;
          }

          next();
        });
      };
    }
  };
};

export const externalsPlugin = (externals: Record<string, string> = {}): Plugin => {
  return {
    name: 'resolve-externals',
    resolveId(id) {
      if (externals[id]) {
        return id;
      }
    },
    load(id) {
      if (externals[id]) {
        return `const externals = window.${externals[id]};export default externals`;
      }
    },
  };
};