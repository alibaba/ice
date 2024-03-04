import { lazy } from 'react';

type ComponentModule<P = {}> = { default: React.ComponentType<P> };

export type LoaderComponent<P = {}> = Promise<React.ComponentType<P> | ComponentModule<P>>;

export type Loader<P = {}> = (() => LoaderComponent<P>) | LoaderComponent<P>;

export interface DynamicOptionsLoadingProps {
  error?: Error | null;
  isLoading?: boolean;
  pastDelay?: boolean;
  retry?: () => void;
  timedOut?: boolean;
}

export interface DynamicOptions {
  ssr?: boolean;
  /** 用于组件获取前的占位 */
  fallback?: (loadingProps: DynamicOptionsLoadingProps) => JSX.Element | null;
}

// Normalize loader to return the module as form { default: Component } for `React.lazy`.
// Also for backward compatible since next/dynamic allows to resolve a component directly with loader
// Client component reference proxy need to be converted to a module.
function convertModule<P>(mod: React.ComponentType<P> | ComponentModule<P>) {
  return { default: (mod as ComponentModule<P>)?.default || mod };
}

export function dynamic<P = {}>(loader: Loader<P>, option?: DynamicOptions) {
  const isServer = typeof global !== 'undefined';
  let realLoader;
  if (loader instanceof Promise) {
    realLoader = () => loader;
  } else if (typeof loader === 'function') {
    realLoader = loader;
  }
  realLoader = () => (realLoader ? realLoader().then(convertModule) : Promise.resolve(convertModule(() => null)));

  return lazy(realLoader);
}
