import * as path from 'path';
import * as fs from 'fs';
import cheerio from 'cheerio';
import type { Plugin } from 'vite';
import type { NormalizedOutputOptions, OutputBundle } from 'rollup';

const addTrailingSlash = (str: string) => {
  return str.substr(-1) === '/' ? str : `${str}/`;
};

const getFiles = (bundle: OutputBundle) => {
  const allFiles =  Object.keys(bundle)
    .map(key => ({
      filename: bundle[key].fileName,
      name: bundle[key].name,
      type: bundle[key].type
    }));

  return [
    allFiles.filter(file => file.type === 'chunk'),
    allFiles.filter(file => file.type === 'asset')
  ];
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
      const [ chunks, assets ] = getFiles(bundle);

      const template = fs.readFileSync(path.resolve(rootDir, 'public', 'index.html'), 'utf-8');

      const $ = cheerio.load(template);

      chunks.forEach(chunk => {
        $('body').append(`<script type="module" src="${addTrailingSlash(base)}${chunk.filename}" />`);
      });

      assets.forEach(asset => {
        $('head').append(`<link rel="stylesheet" href="${addTrailingSlash(base)}${asset.filename}" />`);
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
