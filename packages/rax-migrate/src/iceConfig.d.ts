export interface ICEConfig {
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
  compileDependencies?: Array<string> | boolean;
  eslint?: boolean | object;
  tsChecker?: boolean;
  plugins?: string[];
}

export interface RouteConfig {
  ignoreFiles?: Array<String>;
  defineRoutesConfig?: Array<any>;
}
