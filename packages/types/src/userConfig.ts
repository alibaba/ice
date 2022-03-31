import type { Config, ModifyWebpackConfig } from './config';

export interface UserConfig {
  alias?: Record<string, string | false>;
  define?: Record<string, string | boolean>;
  devPublicPath?: string;
  publicPath?: string;
  hash?: boolean | string;
  externals?: Config['externals'];
  outputDir?: string;
  proxy?: Config['proxy'];
  filename?: string;
  webpack?: ModifyWebpackConfig;
}
