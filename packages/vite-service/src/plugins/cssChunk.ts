import * as path from 'path';
import * as fse from 'fs-extra';
import { formatPath } from '@builder/app-helpers';
import type { Plugin } from 'vite';

export interface EmittedAsset {
  fileName?: string;
  name?: string;
  source?: string | Uint8Array;
  type: 'asset';
}

export type ChunkName = string | Record<string, string>;

function parseCssName(name: string, index: number) {
  let cssName = name.replace(path.extname(name), '');
  if (index > 0) {
    cssName = `${cssName}-${index}`;
  }
  return `${cssName}.css`;
}

const addTrailingSlash = (str: string): string => {
  return str[str.length - 1] === '/' ? str : `${str}/`;
};

export const cssChunk = (chunkName: ChunkName): Plugin => {
  let viteManifestPlugin: Plugin;
  let fileData: any;
  let outputDir = '';
  let base = '';
  return {
    name: 'vite-plugin-css-chunk-name',
    config(cfg, { command }) {
      if (command === 'build') {
        cfg.build.manifest = true;
        outputDir = path.join(cfg.root, cfg.build.outDir);
        base = addTrailingSlash(cfg.base);
      }
    },
    buildStart({ plugins }) {
      viteManifestPlugin = plugins && plugins.find(({ name }) => name === 'vite:manifest');
    },
    generateBundle: async (options, bundle, isWrite) => {
      await viteManifestPlugin.generateBundle.call({
        ...(this as any),
        emitFile: (file: EmittedAsset) => {
          fileData = JSON.parse(file.source as string);
          return '__manifest';
        }}, options, bundle, isWrite);
    },
    closeBundle: () => {
      Object.keys(fileData).forEach(key => {
        if (fileData[key].isEntry) {
          const entryName = key.replace(path.extname(key), 'key');
          const cssChunkName = typeof chunkName === 'string' ? chunkName : chunkName[entryName];
          const entryData = fileData[key];
          const entryCss = entryData?.css;
          if (entryCss && cssChunkName) {
            const htmlPath = path.join(outputDir, entryData.src);
            let htmlContent = entryData?.src && fse.readFileSync(htmlPath, 'utf8');
            let cssIndex = 0;
            entryCss.forEach((cssLink: string) => {
              const cssDir = path.dirname(cssLink);
              const sourceCss = path.join(outputDir, cssLink);
              const cssName = parseCssName(cssChunkName, cssIndex);
              const renamedCss = formatPath(path.join(cssDir, cssName));
              if (cssLink !== renamedCss) {
                fse.writeFileSync(path.join(outputDir, cssDir, cssName), fse.readFileSync(sourceCss, 'utf-8'));
                // replace css link
                htmlContent = htmlContent.replace(/<link[\s\S]*href=["']([^'"]*)["'][^>]*>/g, (str, matched) => {
                  return matched === `${base}${cssLink}` ? str.replace(matched, `${base}${renamedCss}`) : str;
                });
              } else {
                console.log('[WARN]', `${chunkName} is conflict with css assets`);
              }
              cssIndex++;
            });
            fse.writeFileSync(htmlPath, htmlContent);
          }
        }
      });
    }
  };
};
