import webpack from '@ice/bundles/compiled/webpack/index.js';
import type { MiniappWebpackOptions } from '../../types.js';
import MiniPlugin from './plugins/MiniPlugin.js';

export class MiniWebpackPlugin {
  config: MiniappWebpackOptions;

  constructor(config: MiniappWebpackOptions) {
    this.config = config;
  }

  getPlugins() {
    const providerPlugin = this.getProviderPlugin();
    const definePlugin = this.getDefinePlugin();
    const miniPlugin = this.getMainPlugin();
    // TODO: any type
    const plugins: Array<any> = [
      providerPlugin,
      definePlugin,
      miniPlugin,
    ];
    return plugins;
  }

  getProviderPlugin() {
    return new webpack.ProvidePlugin({
      window: ['@ice/miniapp-runtime', 'window'],
      document: ['@ice/miniapp-runtime', 'document'],
      navigator: ['@ice/miniapp-runtime', 'navigator'],
      requestAnimationFrame: ['@ice/miniapp-runtime', 'requestAnimationFrame'],
      cancelAnimationFrame: ['@ice/miniapp-runtime', 'cancelAnimationFrame'],
      Element: ['@ice/miniapp-runtime', 'Element'],
      SVGElement: ['@ice/miniapp-runtime', 'SVGElement'],
      MutationObserver: ['@ice/miniapp-runtime', 'MutationObserver'],
    });
  }

  getDefinePlugin() {
    const {
      env = {},
    } = this.config;

    const envConstants = Object.keys(env).reduce((target, key) => {
      target[`process.env.${key}`] = env[key];
      return target;
    }, {});

    const definitionsList = [envConstants];
    const definitions = Object.assign({}, ...definitionsList);
    return new webpack.DefinePlugin(definitions);
  }

  getMainPlugin() {
    const { rootDir, template, fileType, configAPI, nativeConfig, projectConfigJson } = this.config;
    const options = {
      rootDir,
      fileType,
      template,
      commonChunks: ['runtime', 'vendors', 'common', 'ice'],
      baseLevel: 16,
      minifyXML: {},
      configAPI,
      nativeConfig,
      projectConfigJson,
    };
    return new MiniPlugin(options);
  }
}
