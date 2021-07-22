import reactRefresh from '@vitejs/plugin-react-refresh';
import * as path from 'path';
import { all } from 'deepmerge';
import { isObject, set, get, isArray } from 'lodash';
import { Context, ITaskConfig } from 'build-scripts';
import { InlineConfig, BuildOptions } from 'vite';
import { indexHtmlPlugin, externalsPlugin, runtimePlugin } from './plugins';

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
    if (!args[2] || !args[2].plugins.has(pluginName)) return;

    const opts = args[2].plugin(pluginName).get('args') ?? [];
    return opts[0];
  };
};

const transformPreProcess = (loaderName: string, rule: string): Transformer => {
  return (...args) => {
    const opt = args[2].module.rules.get(rule).use(loaderName).get('options');
    return opt;
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
    transform: (value) => {
      const blackList = ['webpack/hot', 'node_modules'];
      const data: Record<string, any> = Object.keys(value).reduce((acc, key) => {
        if (!blackList.some(word => value[key]?.includes(word))) acc[key] = value[key];
        return acc;
      }, {});

      return data;
    }
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
  'sass': {
    name: 'css.preprocessorOptions.scss',
    transform: transformPreProcess('sass-loader', 'scss')
  },
  'less': {
    name: 'css.preprocessorOptions.less',
    transform: transformPreProcess('less-loader', 'less')
  }
};

const recordMap = (
  chain: ITaskConfig['chainConfig'],
  ctx: Context
): Partial<Record<keyof Option, any>> => {
  return Object.keys(configMap).reduce((acc, key) => {
    const viteConfig = configMap[key];
    const webpackValue = get(chain.toConfig(), key);

    if (typeof viteConfig !== 'string') {
      const value = viteConfig.transform(webpackValue, ctx, chain);
      if (value) {
        set(acc, viteConfig.name, value);
      }
      return acc;
    }

    if (webpackValue) {
      set(acc, viteConfig, webpackValue);
    }
    return acc;
  }, {});
};

export const wp2vite = (context: Context): Result => {
  const { commandArgs = {}, userConfig, rootDir } = context;
  const configArr = context.getWebpackConfig();
  const config = configArr[0];

  // console.log(config.chainConfig.toConfig().module.rules);

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
      runtimePlugin(),
    ],
  }, viteConfig]);

  const prodConfig = all([{
    configFile: false,
  }, viteConfig]);

  return { devConfig, prodConfig };
};
