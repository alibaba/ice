import type { Plugin } from 'vite';
import * as fs from 'fs-extra';
import * as path from 'path';
import legacy from '@vitejs/plugin-legacy';
import * as glob from 'fast-glob';
import { replace } from 'lodash';

interface Option {
  value: 'usage' | 'entry' | false,
  browserslist: any,
  rootDir: string,
  hash: boolean,
  outputAssetsPath: { css: string; js: string }
}

export const polyfillPlugin = (
  option: Option
): Plugin[] => {
  const { value, browserslist, rootDir, hash, outputAssetsPath } = option;

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
      const distPath = path.resolve(rootDir, outDir);
      const assetsPath = path.resolve(distPath, assetsDirName);
      const jsDirPath = path.resolve(distPath, outputAssetsPath.js);
      let polyfillsFile = glob.sync(path.resolve(assetsPath, 'polyfills-legacy.*.js'))[0];

      if (!polyfillsFile) return;

      const hashName = path.relative(assetsPath, polyfillsFile);
      let fileName = hashName;

      // 拖到 js 文件夹下
      fs.moveSync(polyfillsFile, path.resolve(jsDirPath, fileName));
      polyfillsFile = path.resolve(jsDirPath, fileName);

      if (!hash) {
        // 清除 hash
        const dest = path.resolve(jsDirPath, 'polyfills-legacy.js');
        fs.renameSync(polyfillsFile, dest);
        fileName = 'polyfills-legacy.js';
      }

      // remove assets dir
      if (!fs.readdirSync(assetsPath).length) {
        fs.rmdirSync(assetsPath);
      }

      // html 字符替换
      const htmlPaths = glob.sync(path.resolve(distPath, '*.html'));
      htmlPaths.forEach(p => {
        const html = fs.readFileSync(p, 'utf-8');
        fs.writeFileSync(
          p,
          replace(html, `/${assetsDirName}/${hashName}`, `/${outputAssetsPath.js}/${fileName}`)
        );
      });
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
