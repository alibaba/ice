import * as React from 'react';
import type { ComponentType, ReactNode } from 'react';
import { DataProvider, useData } from './RouteContext.js';
import { getGlobalDataLoader } from './dataLoader.js';
import type { RouteComponent } from './types.js';

const LOADER = '__ICE_SUSPENSE_LOADER__';
const isClient = typeof window !== 'undefined' && 'onload' in window;

interface SuspenseProps {
  id: string;
  module: RouteComponent;
}

export function Suspense(props: SuspenseProps) {
  const { module } = props;

  const { serverDataLoader, dataLoader, Loading, Fallback } = module;

  // module.id is export by common component.
  // props.id is passed by router component.
  const moduleId = module.id || props.id;

  const Children = module.default;

  const data = createDataLoader(serverDataLoader, dataLoader, moduleId);

  return (
    <DataProvider value={data}>
      <React.Suspense fallback={Loading ? <Loading /> : null}>
        <ErrorBoundary fallback={Fallback}>
          <Data id={moduleId} />
          <Children />
        </ErrorBoundary>
      </React.Suspense>
    </DataProvider>
  );
}

function Data(props) {
  const data = useData();

  return (
    <script dangerouslySetInnerHTML={{ __html: `if (!window.${LOADER}) { window.${LOADER} = new Map();} window.${LOADER}.set('${props.id}', ${JSON.stringify(data)})` }} />
  );
}

type EProps = {
  children: ReactNode[];
  fallback?: ComponentType;
};

type EState = {
  hasError: boolean;
};

// ErrorBoundary will only work in client side.
class ErrorBoundary extends React.Component<EProps, EState> {
  state: EState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback;
      return Fallback ? <Fallback /> : null;
    }

    return this.props.children;
  }
}

function createDataLoader(serverDataLoader, dataLoader, id) {
  let done = false;
  let promise: Promise<any> | null = null;
  let data = null;
  let error = null;

  return {
    read() {
      if (isClient && window[LOADER] && window[LOADER].has(id)) {
        return window[LOADER].get(id);
      }

      // react will catch this error and retry when hydrate.
      if (error) {
        throw error;
      }

      if (done) {
        return data;
      }

      if (promise) {
        throw promise;
      }

      promise = serverDataLoader?.() || dataLoader?.() || getGlobalDataLoader?.()?.getData(id);

      if (promise) {
        promise.then((response) => {
          done = true;
          data = response;
          promise = null;
        }).catch(e => {
          done = true;
          error = e;
          promise = null;
        });
      }

      throw promise;
    },
  };
}