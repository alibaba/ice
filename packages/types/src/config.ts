import type { RuleSetRule, Configuration } from 'webpack';
import type { ProxyConfigArray, ProxyConfigArrayItem, ProxyConfigMap, Middleware } from 'webpack-dev-server';
import type { UnpluginOptions } from 'unplugin';
import type Server from 'webpack-dev-server';

interface ConfigurationCtx extends Omit<Config, 'webpack'> {
  supportedBrowsers: string[];
  hashKey: string;
}

type Experimental = Pick<Configuration, 'experiments'>;

export type ModifyWebpackConfig = (config: Configuration, ctx: ConfigurationCtx) => Configuration;

export interface Config {
  mode: 'none' | 'development' | 'production';

  define?: Record<string, string | boolean>;

  experimental?: Experimental;

  configureWebpack?: ModifyWebpackConfig[];

  outputDir?: string;

  externals?: Record<string, string | string[]>;

  outputAssetsPath?: Record<string, string>;

  sourceMap?: boolean | string;

  publicPath?: string;

  loaders?: (RuleSetRule | '...')[];

  alias?: Record<string, any>;

  hash?: boolean | string;

  transformPlugins?: UnpluginOptions[];

  transforms?: UnpluginOptions['transform'][];

  middlewares?:
    | ((middlewares: Middleware[], devServer: Server) => Middleware[])
    | undefined;

  proxy?: ProxyConfigArrayItem | ProxyConfigMap | ProxyConfigArray | undefined;

  compileIncludes?: (string | RegExp)[];
}
