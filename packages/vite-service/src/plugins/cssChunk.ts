import type { Plugin } from 'vite';

export interface EmittedAsset {
  fileName?: string;
  name?: string;
  source?: string | Uint8Array;
  type: 'asset';
}

export const cssChunk = (): Plugin => {
  let viteManifestPlugin: Plugin;
  let fileData: any;
  return {
    name: 'vite-plugin-css-chunk-name',
    config(cfg, { command }) {
      if (command === 'build') {
        cfg.build.manifest = true;
      }
    },
    buildStart({ plugins }) {
      viteManifestPlugin = plugins.find(({ name }) => name === 'vite:manifest');
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
      const entryKey = Object.keys(fileData).find((key) => fileData[key].isEntry);
      const entryCss = fileData[entryKey]?.css;
      if (entryCss) {
        entryCss.forEach((cssLink) => {
          console.log(cssLink);
        });
      }
    }
  };
};
