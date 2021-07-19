import { isObject, pick } from 'lodash';
import { InlineConfig } from 'vite';
import { indexHtmlPlugin, externalsPlugin } from './plugins';

export const wp2vite = (context: any, isDev = false): InlineConfig => {
  const { commandArgs = {}, userConfig } = context;
  const configArr = context.getWebpackConfig();
  const config = configArr[0];

  const viteConfig = {
    publicDir: userConfig.publicDir,
    define: userConfig.define,
  };

  if (isObject(userConfig.vite)) {
    // merge
    // deep(userConfig.vite, viteConfig)
  }

  const devServerConfig = {
    port: commandArgs.port || 3333,
    host: commandArgs.host || '0.0.0.0',
    https: commandArgs.https || false,
    proxy: userConfig.proxy,
    open: true,
  };

  return {
    mode: config.mode,
    configFile: false,
    server: isDev ? devServerConfig : null,
    resolve: pick(config.resolve, 'alias', 'extensions') as any,
    plugins: [
      indexHtmlPlugin({
        entry: userConfig.entry,
        temp: 'public'
      }),
      externalsPlugin(userConfig.externals)
    ],
    ...viteConfig
  };
};