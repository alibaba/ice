import * as path from 'path';
import * as fs from 'fs';
import cheerio from 'cheerio';
import type { Plugin } from 'vite';
import type { NormalizedOutputOptions, OutputBundle } from 'rollup';

const addTrailingSlash = (str: string) => {
  return str.substr(-1) === '/' ? str : `${str}/`;
};

const getFiles = (bundle: OutputBundle) => {
  return Object.keys(bundle)
    .map(key => {
      const { fileName, name, type } = bundle[key];

      return {
        fileName,
        name,
        type,
        extension: path.extname(fileName)
      };
    });
};

export const htmlPlugin = (rootDir: string): Plugin => {
  let base = '/';

  return ({
    name: 'vite-plugin-icestark-html',
    enforce: 'pre',
    apply: 'build',

    config(cfg) {
      base = cfg.base ?? base;
    },

    async generateBundle (output: NormalizedOutputOptions, bundle: OutputBundle) {
      const allFiles = getFiles(bundle);

      const template = fs.readFileSync(path.resolve(rootDir, 'public', 'index.html'), 'utf-8');

      const $ = cheerio.load(template);

      allFiles
        .filter(file => file.extension === '.js')
        .forEach(chunk => {
          $('body').append(`<script type="module" src="${addTrailingSlash(base)}${chunk.fileName}" />`);
        });

      allFiles
        .filter(file => file.extension === '.css')
        .forEach(asset => {
          $('head').append(`<link rel="stylesheet" href="${addTrailingSlash(base)}${asset.fileName}" />`);
        });

      this.emitFile({
        type: 'asset',
        source: $.html(),
        name: 'ice html asset',
        fileName: 'index.html'
      });
    }
  }

  );
};
