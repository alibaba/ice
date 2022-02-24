import { type RuleSetRule } from 'webpack';
import { type Middleware } from 'webpack-dev-server';
import type Server from 'webpack-dev-server';

export interface Config {
  mode: 'none' | 'development' | 'production';

  outputDir?: string;

  externals?: Record<string, string | string[]>;

  outputAssetsPath?: Record<string, string>;

  sourceMap?: boolean | string;

  publicPath?: string;

  devPublicPath?: string;

  loaders?: (RuleSetRule | '...')[];

  alias?: Record<string, any>;

  hash?: boolean;

  middlewares?:
    | ((middlewares: Middleware[], devServer: Server) => Middleware[])
    | undefined;
}
