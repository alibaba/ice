import { IPluginAPI } from 'build-scripts';
import { InlineConfig, build } from 'vite';
import { rollup, OutputOptions, InputOptions } from 'rollup';
import { cloneDeep } from 'lodash';
import { join } from 'path';
// import typescript from '@rollup/plugin-typescript';

// console.log(typeof typescript);

function viteSSR(api: IPluginAPI, ssrEntry: string) {
  const { onHook } = api;

  onHook('before.start.run', async ({ config }: { config: InlineConfig }) => {
    //  compile and bundle ssrEntry(server.js)
    const serverBuildConfig = cloneDeep(config);
    serverBuildConfig.build.rollupOptions = {
      input: ssrEntry,
      output: {
        entryFileNames:'server/index.js',
        format: 'cjs',
        manualChunks: {}
      }
    };
    delete serverBuildConfig.css;
    delete serverBuildConfig.plugins[6];
    delete serverBuildConfig.plugins[4];

    await build(serverBuildConfig);
  });
}

export default viteSSR;
