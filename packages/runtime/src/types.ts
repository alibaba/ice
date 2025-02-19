import type { ComponentType } from 'react';
import type { AgnosticRouteObject, Location, RouterInit, StaticHandlerContext } from '@remix-run/router';
import type { Params, RouteObject } from 'react-router-dom';
import type {
  AppContext,
  AppExport,
  ComponentWithChildren,
  DataLoaderResult,
  LoaderData,
  PageConfig,
  RenderMode,
  RequestContext,
  RuntimeModules,
  AssetsManifest,
} from '@ice/runtime-kit';
import type { RouteLoaderOptions } from './routes.js';
import type { NodeWritablePiper, RenderToPipeableStreamOptions } from './server/streamRender.js';

interface DocumentLoaderOptions {
  documentOnly?: boolean;
}
export type DocumentDataLoader = (ctx: RequestContext, options: DocumentLoaderOptions) => DataLoaderResult;

export interface DocumentDataLoaderConfig {
  loader: DocumentDataLoader;
}

export type PublicAppContext = Pick<
AppContext,
 'appConfig' | 'routePath' | 'downgrade' | 'documentOnly' | 'renderMode'
>;

export type WindowContext = Pick<
AppContext,
  'appData' | 'loaderData' | 'routePath' | 'downgrade' | 'matchedIds' | 'documentOnly' | 'renderMode' | 'serverData' | 'revalidate'
>;


export type RouteItem = AgnosticRouteObject & {
  componentName: string;
  Component?: ComponentType<any>;
  exports?: string[];
  layout?: boolean;
  children?: RouteItem[];
};

export type DocumentComponent = ComponentWithChildren<{
  pagePath: string;
}>;

export interface AppRouterProps {
  routes?: RouteObject[];
  location?: Location;
  Component?: ComponentType<any>;
  loaderData?: LoaderData;
}

export interface ClientAppRouterProps extends AppRouterProps {
  routerContext?: Omit<RouterInit, 'routes'> & { routes?: RouteObject[] };
}

export interface ServerAppRouterProps extends AppRouterProps {
  routerContext?: StaticHandlerContext;
}

export interface AppRouteProps {
  routes: RouteItem[];
}

// rewrite the `RouteMatch` type which is referenced by the react-router-dom
export interface RouteMatch {
  /**
   * The names and values of dynamic parameters in the URL.
   */
  params: Params;
  /**
   * The portion of the URL pathname that was matched.
   */
  pathname: string;
  /**
   * The portion of the URL pathname that was matched before child routes.
   */
  pathnameBase: string;
  /**
   * The route object that was used to match.
   */
  route: RouteItem;
}

interface Piper {
  pipe: NodeWritablePiper;
  fallback: Function;
}

export interface Response {
  statusCode?: number;
  statusText?: string;
  value?: string | Piper;
  headers?: Record<string, string>;
}

export interface RenderOptions {
  app: AppExport;
  assetsManifest: AssetsManifest;
  createRoutes: (options: Pick<RouteLoaderOptions, 'requestContext' | 'renderMode'>) => RouteItem[];
  runtimeModules: RuntimeModules;
  documentDataLoader?: DocumentDataLoaderConfig;
  Document?: DocumentComponent;
  documentOnly?: boolean;
  preRender?: boolean;
  getAssets?: boolean;
  renderMode?: RenderMode;
  // basename is used both for server and client, once set, it will be sync to client.
  basename?: string;
  // serverOnlyBasename is used when just want to change basename for server.
  serverOnlyBasename?: string;
  routePath?: string;
  disableFallback?: boolean;
  routesConfig?: {
    [key: string]: PageConfig;
  };
  runtimeOptions?: Record<string, any>;
  serverData?: any;
  streamOptions?: RenderToPipeableStreamOptions;
}

declare global {
  interface ImportMeta {
    // The build target for ice.js
    // Usually `web` or `node` or `weex`
    target: string;
    // The renderer for ice.js
    renderer: 'client' | 'server';
    // ice.js defined env variables
    env: Record<string, string>;
  }
}
