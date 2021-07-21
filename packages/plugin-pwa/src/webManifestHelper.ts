import * as path from 'path';
import { pathExistsSync, readFileSync } from 'fs-extra';
import * as cheerio from 'cheerio';
import Config = require('webpack-chain');

function hasWebManifest (rootDir: string) {
  return pathExistsSync(
    path.join(rootDir, 'public/manifest.json')
  );
}

function appendManifestToHtml (config: Config) {
  config
    .plugin('HtmlWebpackPlugin')
    .tap(([args]) => {
      const tempalte = readFileSync(args.template);
      const $ = cheerio.load(tempalte);
      $('head').append('<link rel="manifest" href="/manifest.json">');

      delete args.template;

      return [{
        ...args,
        templateContent: $.html(),
      }];
    });
}

export {
  hasWebManifest,
  appendManifestToHtml,
};
