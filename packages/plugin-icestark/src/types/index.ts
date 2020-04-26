import { AppConfig } from '@ice/stark';

export interface IAppRouter {
  ErrorComponent?: React.ComponentType;
  LoadingComponent?: React.ComponentType;
  NotFoundComponent?: React.ComponentType;
  shouldAssetsRemove?: (
    assetUrl?: string,
    element?: HTMLElement | HTMLLinkElement | HTMLStyleElement | HTMLScriptElement,
  ) => boolean;
}

export interface IGetApps {
  (): AppConfig[]|Promise<AppConfig[]>;
}

export interface IIceStark {
  type: 'framework' | 'child';
  getApps?: IGetApps;
  appRouter?: IAppRouter;
  removeRoutesLayout?: boolean;
  AppRoute?: React.ComponentType;
  Layout?: React.ComponentType;
  registerAppEnter?: (mountNode: HTMLElement, App: React.ComponentType, resolve: (value?: unknown) => void) => void;
  registerAppLeave?: (mountNode: HTMLElement) => void;
}
