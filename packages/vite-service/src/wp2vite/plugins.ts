import { ViteDevServer, Plugin } from 'vite';
import { redirectImport } from '@builder/app-helpers';
import legacy from '@vitejs/plugin-legacy';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as glob from 'fast-glob';
import * as log from 'npmlog';
import { all } from 'deepmerge';

interface HtmlOption {
  entry: any // only spa
  temp: string
  rootDir: string
  ignoreHtmlTemplate: boolean
}

/**
 * 1. public/index.html -> /index.html
 * 2. add script entry
 * 3. TODO: MPA
 */
export const indexHtmlPlugin = ({ entry, temp, rootDir, ignoreHtmlTemplate }: HtmlOption): Plugin => {
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

export const polyfillPlugin = (
  option: { value: 'usage' | 'entry' | false, browserslist: any, rootDir: string, hash: boolean }
): Plugin[] => {
  const { value, browserslist, rootDir, hash } = option;

  if (!value) return;

  let outDir = '';
  let assetsDirName = '';

  /**
   * hash 为开启时，清除 polyfill hash 后缀
   */
  const plugin: Plugin = {
    name: 'rollup-plugin-polyfills-clear',
    config(cfg, { command }) {
      if (command === 'build') {
        outDir = cfg.build?.outDir ?? 'dist';
        assetsDirName = cfg.build?.assetsDir ?? 'assets';
      }
    },
    async closeBundle() {
      if (hash) return;
      const distPath = path.resolve(rootDir, outDir);
      const assetsPath = path.resolve(distPath, assetsDirName);
      const polyfillsFiles = glob.sync(path.resolve(assetsPath, 'polyfills-legacy.*.js'));

      if (polyfillsFiles.length) {
        polyfillsFiles.forEach(file => {
          fs.renameSync(file, path.resolve(assetsPath, 'polyfills-legacy.js'));
        });
      }
    }
  };

  return [
    plugin,
    legacy({
      targets: browserslist,
      polyfills: value === 'usage'
    })
  ];
};