import { ViteDevServer, Plugin } from 'vite';
import { redirectImport } from '@builder/app-helpers';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as log from 'npmlog';

interface HtmlOption {
  entry: any // only spa
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
    name: 'vite-plugin-index-html',
    config(cfg, { command }) {
      if (command === 'build') {
        outDir = cfg.build?.outDir ?? 'dist';
      }
      cfg.build = {
        ...cfg.build,
        commonjsOptions: {
          exclude: ['react-app-renderer', 'create-app-shared'],
        },
        rollupOptions: {
          ...cfg.build?.rollupOptions,
          input: path.resolve(rootDir, temp, 'index.html'),
        },
      };
    },
    async closeBundle() {
      // SPA
      const distPath = path.resolve(rootDir, outDir);
      const outPath = path.resolve(distPath, 'index.html');
      const sourcePath = path.resolve(distPath, temp, 'index.html');

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, outPath);
        fs.removeSync(sourcePath);

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

export const externalsPlugin = (externals: Record<string, string> = {}): Plugin => {
  return {
    name: 'vite-plugin-resolve-externals',
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

export const importPlugin = ({ rootDir }): Plugin => {
  const iceTempPath = path.resolve(rootDir, '.ice/core/runApp');
  return {
    name: 'vite-plugin-import',
    transform: async (code, id) => {
      if (!/\.(?:[jt]sx?|[jt]s?)$/.test(id)) return;

      // 获取相对路径
      const url = path.relative(path.resolve(id, '..'), iceTempPath);
      return await redirectImport(code, {
        source: 'ice', redirectImports: [
          {
            name: 'runApp',
            redirectPath: url,
            default: false,
          }
        ]
      });
    }
  };
};