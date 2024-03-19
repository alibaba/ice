import type { ReactNode } from 'react';
import React, { Suspense, lazy } from 'react';
import useMounted from './useMounted.js';

const isServer = import.meta.renderer === 'server';

type ComponentModule<P = {}> = { default: React.ComponentType<P> };

export type LoaderComponent<P = {}> = Promise<React.ComponentType<P> | ComponentModule<P>>;

export type Loader<P = {}> = (() => LoaderComponent<P>) | LoaderComponent<P>;

export interface DynamicOptions {
  /** @default true */
  ssr?: boolean;
  /** the fallback UI to render before the actual is loaded */
  fallback?: () => ReactNode;
}

// Normalize loader to return the module as form { default: Component } for `React.lazy`.
function convertModule<P>(mod: React.ComponentType<P> | ComponentModule<P>) {
  return { default: (mod as ComponentModule<P>)?.default || mod };
}

const DefaultFallback = () => null;

export function dynamic<P = {}>(loader: Loader<P>, option?: DynamicOptions) {
  const { ssr = true, fallback = DefaultFallback } = option || {};
  let realLoader;
  // convert dynamic(import('xxx')) to dynamic(() => import('xxx'))
  if (loader instanceof Promise) {
    realLoader = () => loader;
  } else if (typeof loader === 'function') {
    realLoader = loader;
  }
  if (!realLoader) return DefaultFallback;
  const Fallback = fallback;

  if (!ssr && isServer) {
    return () => <Fallback />;
  }

  const LazyComp = lazy(() => realLoader().then(convertModule));
  return (props) => {
    const hasMounted = useMounted();

    return ssr || hasMounted ? (
      <Suspense fallback={<Fallback />}>
        <LazyComp {...props} />
      </Suspense>
    ) : (
      <Fallback />
    );
  };
}
