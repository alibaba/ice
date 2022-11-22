import type { ICEConfig } from './iceConfig';

export interface RaxAppConfig {
  webpack5?: boolean;
  inlineStyle?: boolean | { forceEnableCSS: boolean };
  alias?: Object;
  publicPath?: string;
  devPublicPath?: string;
  sourceMap?: boolean | string;
  externals?: Object;
  hash?: string | boolean;
  minify?: boolean;
  outputDir?: string;
  proxy?: object;
  define?: object;
  browserslist?: string | object;
  compileDependencies?: Array<string>;
  terserOptions: object;
  eslint?: boolean | object;
  tsChecker?: boolean;
  plugins?: Array<String>;
  webpackPlugins?: Array<String>;
  webpackLoaders?: Array<String>;
  babelPlugins?: Array<string>;
  babelPresets?: Array<string>;
  postcssrc?: boolean;
  postcssOptions?: Object;
  cssLoaderOptions?: Object;
  lessLoaderOptions?: Object;
  sassLoaderOptions?: Object;
  devServer?: Object;
  polyfill?: string | false;
}

export interface Config {
  inlineStyle?: boolean | { forceEnableCSS: boolean };
  browsersListRc?: string;
  extraPlugins: Array<String>;
  webpackPlugins?: Array<String>;
  webpackLoaders?: Array<String>;
  babelPlugins?: Array<string>;
  babelPresets?: Array<string>;
  postcssrc?: boolean;
  postcssOptions?: Object;
  cssLoaderOptions?: Object;
  lessLoaderOptions?: Object;
  sassLoaderOptions?: Object;
  devServer?: Object;
}

const PLUGINS = {
  '@ali/build-plugin-rax-app-def': '@ali/ice-plugin-def',
  '@ali/build-plugin-rax-faas': '@ali/build-plugin-faas',
  // TODO: @ali/build-plugin-track-info-register
};

async function transformBuild(buildJson: RaxAppConfig): Promise<{ config: Config; iceConfig: ICEConfig }> {
  const config: Config = {
    extraPlugins: [],
  };

  const iceConfig: ICEConfig = {
    plugins: [],
  };

  // TODO: support other options of build.json.

  if (!buildJson.webpack5) {
    console.warn('The Rax project currently uses Webpack4, but ICE3 uses Webpack5. Please be aware of the differences.');
  }

  if (buildJson.browserslist) {
    // Save browserslist to .browserslistrc file in ICE3.
    if (typeof buildJson.browserslist === 'string') {
      config.browsersListRc = buildJson.browserslist;
    } else {
      config.browsersListRc = '';
      for (const key in buildJson.browserslist) {
        config.browsersListRc += `${key} ${buildJson.browserslist[key]}\n`;
      }
    }
  }

  // Warning deprecated config.
  ['esbuild', 'vendor', 'modularImportRuntime', 'terserOptions', 'polyfill'].forEach(configName => {
    if (buildJson[configName]) {
      console.warn(`The config '${configName}' has been deprecated, please check it.`);
    }
  });

  // Mapping the rax plugins to ice plugins.
  buildJson.plugins.forEach((raxPlugin: string) => {
    const icePluginName = PLUGINS[raxPlugin];
    if (icePluginName) {
      config.extraPlugins.push(icePluginName);
    } else {
      console.warn(`There is no ICE plugin that can be automatically replaced ${raxPlugin} plugin at present, please manually confirm whether it is needed.`);
    }
  });

  // Mapping the same config to config.
  [
    'webpackPlugins',
    'webpackLoaders',
    'babelPlugins',
    'babelPresets',
    'postcssrc',
    'postcssOptions',
    'cssLoaderOptions',
    'lessLoaderOptions',
    'sassLoaderOptions',
    'devServer',
    'inlineStyle',
  ].forEach(key => {
    config[key] = buildJson[key];
  });

  // Mapping the same config to iceConfig.
  [
    'alias',
    'publicPath',
    'devPublicPath',
    'sourceMap',
    'externals',
    'hash',
    'minify',
    'outputDir',
    'proxy',
    'define',
    'compileDependencies',
    'eslint',
    'tsChecker',
  ].forEach(key => {
    if (buildJson[key] !== undefined) {
      iceConfig[key] = buildJson[key];
    }
  });

  return { config, iceConfig };
}

export default transformBuild;
