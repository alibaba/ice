import type { History } from 'history';
import type { createElement, ComponentType } from 'react';

type VoidFunction = () => void;

type App = Partial<{
  rootId: string,
  renderComponent?: ComponentType & {
    __pageConfig?: {
      source?: string;
      path?: string;
      name?: string;
      [key:string]: any;
    };
  },
} & Record<'onShow' | 'onHide' | 'onPageNotFound' | 'onShareAppMessage' | 'onUnhandledRejection' | 'onLaunch' | 'onError' | 'onTabItemClick', VoidFunction>>;

export interface AppConfig {
  app?: App,
  router?: {
    type?: 'hash' | 'browser' | 'memory' | 'static';
    history?: History;
    basename?: string;
    initialIndex?: number;
    initialEntries?: string[];
  },
}

export type BuildConfig = Record<string, any>;

export type ReactCreateElement = typeof createElement;

export type UseEffect = (effect: React.EffectCallback, deps?: React.DependencyList) => void;

export type Listener = () => any;

export type CreateUsePageLifeCycle = ({ useEffect }:{ useEffect: UseEffect }) => { usePageShow: (callback: Listener) => void; usePageHide: (callback: Listener) => void };

export type WithPageLifeCycle = <P>(Component: React.ComponentClass<P>) => React.ComponentClass;

export interface Context {
  createElement?: ReactCreateElement;
  enableRouter?: boolean;
}
