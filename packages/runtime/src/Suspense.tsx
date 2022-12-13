import * as React from 'react';
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

  const { serverDataLoader, dataLoader, Loading } = module;

  // module.id is export by common component.
  // props.id is passed by router component.
  const moduleId = module.id || props.id;

  const Children = module.default;

  const data = createDataLoader(serverDataLoader, dataLoader, moduleId);

  return (
    <DataProvider value={data}>
      <React.Suspense fallback={Loading ? <Loading /> : null}>
        <>
          <Data id={moduleId} />
          <Children />
        </>
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

function createDataLoader(serverDataLoader, dataLoader, id) {
  let done = false;
  let promise: Promise<any> | null = null;
  let data = null;

  return {
    read() {
      if (isClient && window[LOADER] && window[LOADER].has(id)) {
        return window[LOADER].get(id);
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
        });
      }

      throw promise;
    },
  };
}