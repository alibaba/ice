import type { History } from 'history';
import type { createElement } from 'react';

type VoidFunction = () => void;

export interface AppConfig {
  app?: {
    rootId?: string;
    onShow?: VoidFunction;
    onHide?: VoidFunction;
    onPageNotFound?: VoidFunction;
    onShareAppMessage?: VoidFunction;
    onUnhandledRejection?: VoidFunction;
    onLaunch?: VoidFunction;
    onError?: VoidFunction;
    onTabItemClick?: VoidFunction;
  },
  router?: {
    type?: 'hash' | 'browser' | 'memory' | 'static';
    history?: History;
    basename?: string;
  }
}

export interface BuildConfig {
  [key: string]: any;
}

export type ReactCreateElement = typeof createElement;

export interface Context {
  createElement?: ReactCreateElement;
}