import type { UnpluginFactory } from 'unplugin';
import { createUnplugin } from 'unplugin';

export interface Options {
  // define your plugin options here
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => ({
  name: 'virtual-asset',
  // load(id) {
  //   if (!id.includes('node_modules')) {
  //     console.log('id', id);
  //   }
  //   if (id === 'virtual:assets-manifest.json') {
  //     process.exit(1);
  //     return 'hello world';
  //   }
  // },
});

export const virtualAssetPlugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default virtualAssetPlugin;
