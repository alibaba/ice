import type { Compiler, EntryObject, RuleSetRule, WebpackPluginInstance } from 'webpack';

export interface IFrameworkConfig {
  mode?: 'none' | 'development' | 'production';

  entry?: string | string[] | EntryObject;

  outputDir?: string;

  externals?: Record<string, string | string[]>;

  vendor?: boolean;

  outputAssetsPath?: Record<string, string>;

  sourceMap?: boolean | string;

  publicPath?: string;

  devPublicPath?: string;

  loaders?: (RuleSetRule | '...')[];

  plugins?: (
		| ((this: Compiler, compiler: Compiler) => void)
		| WebpackPluginInstance
	)[];
}
