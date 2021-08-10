import type { ViteDevServer, Plugin } from 'vite';
import { all } from 'deepmerge';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as log from 'npmlog';


interface Option {
  entry: any // only spa
  temp: string
  rootDir: string
  ignoreHtmlTemplate: boolean
}

/**
 * 1. public/index.html -> /index.html
 * 2. add script entry
 */
export const indexHtmlPlugin = ({ entry, temp, rootDir, ignoreHtmlTemplate }: Option): Plugin => {
  let outDir = '';
  let isBuild = false;

  const clearEmptyDir = (dirPath: string) => {
    if (fs.readdirSync(dirPath).length === 0) {
      fs.removeSync(dirPath);
    }
  };

  return {
    name: 'vite-plugin-index-html',
    config(cfg, { command }) {
      if (command === 'build') {
        isBuild = true;
        outDir = cfg.build?.outDir ?? 'dist';
      }
      const build = {
        commonjsOptions: {
          exclude: ['react-app-renderer', 'create-app-shared'],
        },
        rollupOptions: {
          input: path.resolve(rootDir, temp, 'index.html'),
        },
      };

      cfg.build = all([cfg.build, build]);
    },
    async closeBundle() {
      // SPA
      const distPath = path.resolve(rootDir, outDir);
      const outPath = path.resolve(distPath, 'index.html');
      const publicPath = path.resolve(distPath, temp);
      const sourcePath = path.resolve(publicPath, 'index.html');

      if (isBuild && ignoreHtmlTemplate) {
        fs.removeSync(sourcePath);
        fs.removeSync(outPath);

        clearEmptyDir(publicPath);
      }

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, outPath);
        fs.removeSync(sourcePath);

        clearEmptyDir(publicPath);

        log.info(`导出文件入口设置为 ${outDir}/index.html`);
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
        },
        {
          tag: 'script',
          injectTo: 'head',
          children: 'global = globalThis'
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
