import { IPluginAPI } from 'build-scripts';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import vitePluginSSR from './vitePluginSSR';

function viteSSR(api: IPluginAPI, ssrEntry: string) {
  const { modifyUserConfig, context: { rootDir } } = api;

  modifyUserConfig('vite.plugins', [viteCommonjs(), vitePluginSSR(ssrEntry, rootDir)], { deepmerge: true });
}

export default viteSSR;
