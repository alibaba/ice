import reactRefresh from '@vitejs/plugin-react-refresh';
import * as path from 'path';
import { all } from 'deepmerge';
import { isObject, set, get, isArray } from 'lodash';
import { Context, ITaskConfig } from 'build-scripts';
import { InlineConfig, BuildOptions } from 'vite';
import { indexHtmlPlugin, externalsPlugin } from './plugins';

type Option = BuildOptions & InlineConfig

type Result = {
  devConfig: InlineConfig
  prodConfig: BuildOptions
}

type Transformer = (value: any, ctx?: Context, chain?: ITaskConfig['chainConfig']) => any

type ConfigMap = Record<string, string | {
  name: string
  transform: Transformer
}>

const transformPlugin = (pluginName: string): Transformer => {
  return (...args) => {
    if (!args[2]) return;
    const opts = args[2].plugin(pluginName)?.values()?.[2] ?? [];
    return opts[0];
  };
};

/**
 * 常用简单配置转换
 */
const configMap: ConfigMap = {
  'output.path': {
    name: 'build.outDir',
    transform: (value, ctx) => path.relative(ctx.rootDir, value)
  },
  'output.publicPath': 'base',
  'resolve.alias': {
    name: 'resolve.alias',
    transform: (value) => Object.keys(value).reduce((acc, key) => {
      if (!value[key]?.includes('node_modules')) acc[key] = value[key];
      return acc;
    }, {})
  },
  'resolve.extensions': {
    name: 'resolve.extensions',
    transform: (value) => (['.mjs', ...value])
  },
  'devServer.watchOptions': {
    name: 'server.watch',
    transform: (value) => {
      if (!isArray(value.ignored)) {
        value.ignored = [value.ignored];
      }
      return value;
    }
  },
  'devServer.proxy': 'server.proxy',
  'plugins.DefinePlugin': {
    name: 'defined',
    transform: transformPlugin('DefinePlugin')
  },
  'plugins.TerserPlugin': {
    name: 'build.terserOptions',
    transform: transformPlugin('TerserPlugin')
  },
};

const recordMap = (
  chain: ITaskConfig['chainConfig'],
  ctx: Context
): Partial<Record<keyof Option, any>> => {
  return Object.keys(configMap).reduce((acc, key) => {
    const viteConfig = configMap[key];
    const webpackValue = get(chain.toConfig(), key);

    if (typeof viteConfig !== 'string') {
      set(acc, viteConfig.name, viteConfig.transform(webpackValue, ctx, chain));
      return acc;
    }

    set(acc, viteConfig, webpackValue);
    return acc;
  }, {});
};

export const wp2vite = (context: Context): Result => {
  const { commandArgs = {}, userConfig, rootDir } = context;
  const configArr = context.getWebpackConfig();
  const config = configArr[0];

  let viteConfig: Partial<Record<keyof Option, any>> = {
    ...recordMap(config.chainConfig, context),
    plugins: [
      externalsPlugin(userConfig.externals as any),
      indexHtmlPlugin({
        entry: userConfig.entry,
        temp: 'public',
        rootDir
      }),
    ]
  };

  // console.log(config.chainConfig.toConfig());
  console.log(viteConfig);

  if (isObject(userConfig.vite)) {
    // userConfig.vite 优先级最高
    viteConfig = all([viteConfig, userConfig.vite]);
  }

  const devServerConfig = {
    port: commandArgs.port || 3333,
    host: commandArgs.host || '0.0.0.0',
    https: commandArgs.https || false,
    open: true,
  };

  const devConfig = all([{
    configFile: false,
    server: devServerConfig,
    plugins: [
      reactRefresh(),
    ],
  }, viteConfig]);

  const prodConfig = all([{
    configFile: false,
    // resolve: pick(config.resolve, 'alias', 'extensions'),
  }, viteConfig]);

  return { devConfig, prodConfig };
};
