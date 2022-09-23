import type { MiniappWebpackOptions, MiniappWebpackConfig } from '../types.js';
import { MiniWebpackModule } from './module.js';
import { MiniWebpackPlugin } from './plugin.js';

export default function getMiniappWebpackConfig(rawConfig: MiniappWebpackOptions): MiniappWebpackConfig {
  const webpackPlugin = new MiniWebpackPlugin(rawConfig);
  const webpackModule = new MiniWebpackModule(rawConfig);

  return {
    plugins: webpackPlugin.getPlugins(),
    module: webpackModule.getModules(),
  };
}
