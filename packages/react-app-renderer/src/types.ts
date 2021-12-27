import * as queryString from 'query-string';
import type { RuntimeModule } from 'create-app-shared';

export type OnError = (err: Error, componentStack: string) => void

export interface Context {
  initialContext: InitialContext,
  initialData: { [k: string]: any },
  pageInitialProps: { [k: string]: any },
  enableRouter?: boolean,
}

export interface ServerContext {
  req?: Request;
  res?: Response;
}

export interface Location {
  pathname: string;
  search?: string;
  hash?: string;
  state?: string | null;
}

export interface InitialContext extends ServerContext {
  pathname: string;
  location?: Location;
  path?: string;
  query?: queryString.ParsedQuery<string>;
}

export type RenderAppConfig = {
  app?: {
    strict?: boolean;
    rootId?: string;
    mountNode?: HTMLElement;
    onErrorBoundaryHandler?: OnError;
    ErrorBoundaryFallback?: React.ComponentType;
    errorBoundary?: boolean;
    getInitialData?: (context: InitialContext) => Promise<any>;
    renderComponent?: React.ComponentType;
  },
};
export type AppLifecycle = {
  createBaseApp: <T>(appConfig: T, buildConfig: any, context: any) => { runtime: RuntimeModule; appConfig: T };
  emitLifeCycles: () => void;
  initAppLifeCycles: () => void;
}

export interface RenderOptions<T = RenderAppConfig, P = any> {
  ErrorBoundary?: React.ComponentType<{Fallback?: React.ComponentType; onError?: Function}>;
  buildConfig: P;
  appConfig: T;
  appLifecycle: AppLifecycle;
  router?: boolean;
}
