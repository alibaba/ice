export interface IRouterOptions {
  caseSensitive?: boolean;
  ignoreRoutes?: IgnoreOptions;
  ignorePaths?: IgnoreOptions;
  configPath?: string;
  lazy?: boolean;
}

export interface ICollectItem {
  routePath: string;
  component: string;
  filePath: string;
  isLayoutLike: boolean;
  exact?: string;
  routePathAmend?: string;
  children?: ICollectItem[];
}

export interface IIgore {
  pattern: RegExp;
  attributes?: string;
}
export type IgnoreType = string | IIgore;
export type IgnoreOptions = IgnoreType | IgnoreType[];
