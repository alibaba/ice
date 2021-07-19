import reactRefresh from '@vitejs/plugin-react-refresh';
import * as path from 'path';
import { all } from 'deepmerge';
import { isObject, pick } from 'lodash';
import { InlineConfig, BuildOptions } from 'vite';
import { indexHtmlPlugin, externalsPlugin } from './plugins';

type Option = BuildOptions & InlineConfig

type Result = {
  devConfig: InlineConfig
  prodConfig: BuildOptions
}

export const wp2vite = (context: any): Result => {
  const { commandArgs = {}, userConfig, rootDir } = context;
  const configArr = context.getWebpackConfig();
  const config = configArr[0];

  let viteConfig: Partial<Record<keyof Option, any>> = {
    publicDir: userConfig.publicDir,
    define: userConfig.define,
    minify: userConfig.minify
  };

  if (isObject(userConfig.vite)) {
    // userConfig.vite 优先级最高
    viteConfig = all([viteConfig, userConfig.vite]);
  }

  const devServerConfig = {
    port: commandArgs.port || 3333,
    host: commandArgs.host || '0.0.0.0',
    https: commandArgs.https || false,
    proxy: userConfig.proxy,
    open: true,
  };

  const devConfig = {
    mode: config.mode,
    configFile: false,
    server: devServerConfig,
    resolve: pick(config.resolve, 'alias', 'extensions'),
    plugins: [
      reactRefresh(),
      indexHtmlPlugin({
        entry: userConfig.entry,
        temp: 'public',
        rootDir
      }),
      externalsPlugin(userConfig.externals)
    ],
    ...viteConfig
  };

  const prodConfig = {
    mode: config.mode,
    configFile: false,
    resolve: pick(config.resolve, 'alias', 'extensions'),
    plugins: [
      indexHtmlPlugin({
        entry: userConfig.entry,
        temp: 'public',
        rootDir
      }),
      externalsPlugin(userConfig.externals)
    ],
    ...viteConfig
  };

  return { devConfig, prodConfig };
};
