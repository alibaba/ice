import { ViteDevServer, Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import * as log from 'npmlog';

interface HtmlOption {
  entry: string
  temp: string
  rootDir: string
}

/**
 * 1. public/index.html -> /index.html
 * 2. add script entry
 * 3. TODO: MPA
 */
export const indexHtmlPlugin = ({ entry, temp, rootDir }: HtmlOption): Plugin => {
  let outDir = '';
  return {
    name: 'index-html-plugin',
    config(cfg, { command }) {
      if (command === 'build') {
        outDir = cfg.build?.outDir ?? 'dist';
      }
      cfg.build = {
        ...cfg.build,
        rollupOptions: {
          input: path.resolve(rootDir, temp, 'index.html')
        },
      };
    },
    async closeBundle() {
      const outPath = path.resolve(rootDir, outDir, 'index.html');
      const sourcePath = path.resolve(rootDir, outDir, temp, 'index.html');

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, outPath);
        fs.rmSync(sourcePath);

        log.info(`导出文件入口设置为${outDir}/index.html`);
      }
    },
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