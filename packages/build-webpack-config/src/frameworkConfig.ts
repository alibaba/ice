import type { RuleSetRule } from 'webpack';

export interface IFrameworkConfig {
  mode: 'none' | 'development' | 'production';

  outputDir?: string;

  externals?: Record<string, string | string[]>;

  outputAssetsPath?: Record<string, string>;

  sourceMap?: boolean | string;

  publicPath?: string;

  loaders?: (RuleSetRule | '...')[];

  alias?: Record<string, any>;

  hash?: boolean;

  devServer?: Record<string, any>;
}
