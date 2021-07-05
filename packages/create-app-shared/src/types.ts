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

export type BuildConfig = Record<string, any>;

export type ReactCreateElement = typeof createElement;

export type UseEffect = (effect: React.EffectCallback, deps?: React.DependencyList) => void;

export type Listener = () => any;

export type CreateUsePageLifeCycle = ({ useEffect }:{ useEffect: UseEffect }) => { usePageShow: (callback: Listener) => void; usePageHide: (callback: Listener) => void };

export type WithPageLifeCycle = <P>(Component: React.ComponentClass<P>) => React.ComponentClass;

export interface Context {
  createElement?: ReactCreateElement;
}