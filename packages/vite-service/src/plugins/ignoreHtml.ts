import type { Plugin } from 'vite';
import * as path from 'path';
import * as glob from 'fast-glob';
import * as fs from 'fs';

export const ignoreHtmlPlugin = (rootDir: string): Plugin => {
  let outDir = '';
  return {
    name: 'vite-plugin-ignore-html',
    enforce: 'post',
    config(cfg, { command }) {
      if (command === 'build') {
        outDir = cfg.build?.outDir ?? 'dist';
      }
    },
    closeBundle() {
      const distPath = path.resolve(rootDir, outDir);
      const htmlFiles = glob.sync(path.resolve(distPath, '*.html'));

      htmlFiles.forEach(file => {
        fs.rmSync(file);
      });
    }
  };
};
