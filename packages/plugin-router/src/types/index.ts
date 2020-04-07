import {
  RouteProps as DefaultRouteProps,
  RouteComponentProps,
} from 'react-router-dom';
import { History } from 'history';

export interface IDynamicImportComponent {
  __LAZY__: boolean;
  dynamicImport: () => Promise<{ default: React.ComponentType<any> }>;
}

export interface IRouteWrapper {
  (props: any): React.ComponentType<any>;
}

export interface RouteItemProps extends DefaultRouteProps {
  children?: RouteItemProps[];
  // disable string[]
  path?: string;
  // for rediect ability
  redirect?: string;

  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | IDynamicImportComponent;

  routeWrappers?: IRouteWrapper[];
};

export interface IRenderRouteProps extends DefaultRouteProps {
  children?: IRenderRouteProps[];
  // disable string[]
  path?: string;
  // for rediect ability
  redirect?: string;

  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export interface RouterProps {
  // custom props
  routes: RouteItemProps[];
  type?: 'hash' | 'browser' | 'memory' | 'static';
  // common props for BrowserRouter&HashRouter&MemoryRouter
  basename?: string;
  getUserConfirmation?: ((message: string, callback: (ok: boolean) => void) => void);
  forceRefresh?: boolean;
  // for BrowserRouter
  keyLength?: number;
  // for HashRouter
  hashType?: 'slash' | 'noslash' | 'hashbang';
  // for MemoryRouter
  initialEntries?: string[];
  initialIndex?: number;
  fallback?: React.ReactNode;
};

interface IModifyFn {
  (routes: RouteItemProps[]): RouteItemProps[];
}

export interface IModifyRoutes {
  (modifyFn: IModifyFn): void;
}

export interface IAppRouterProps {
  type?: 'hash' | 'browser' | 'memory';
  routes?: RouteItemProps[];
  basename?: string;
  modifyRoutes?: IModifyRoutes;
  fallback?: React.ReactNode;
  history?: History;
}

export interface RoutesProps {
  routes: IRenderRouteProps[];
  fallback?: React.ReactNode;
};

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
