import { IPluginAPI } from 'build-scripts';
import vitePluginSSR from './vitePluginSSR';

function viteSSR(api: IPluginAPI, ssrEntry: string) {
  const { modifyUserConfig, context: { rootDir } } = api;

  modifyUserConfig('vite.plugins', [vitePluginSSR(ssrEntry, rootDir)], { deepmerge: true });
}

export default viteSSR;
