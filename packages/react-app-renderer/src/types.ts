import * as queryString from 'query-string';
import type { RuntimeModule } from 'create-app-shared';

export type OnError = (err: Error) => void
export interface Context {
  pathname: string;
  path: string;
  query: queryString.ParsedQuery<string>;
  ssrError: any;
}
export type RenderAppConfig = {
  app?: {
    rootId?: string;
    mountNode?: HTMLElement;
    onErrorBoundaryHandler?: OnError;
    ErrorBoundaryFallback?: React.ComponentType;
    errorBoundary?: boolean;
    getInitialData?: (context: Context) => Promise<any>;
  }
};
export type AppLifecycle = {
  createBaseApp: <T>(appConfig: T, buildConfig: any, context: any) => { runtime: RuntimeModule; appConfig: T };
  emitLifeCycles: () => void;
  initAppLifeCycles: () => void;
}

export interface RenderOptions<T = RenderAppConfig, P = any> {
  ErrorBoundary: React.ComponentType<{Fallback?: React.ComponentType; onError?: Function}>;
  buildConfig: P;
  appConfig: T;
  appLifecycle: AppLifecycle
}