import * as React from 'react';
import { DataProvider, useData } from './RouteContext.js';
import { getGlobalDataLoader } from './dataLoader.js';

const LOADER = '__ICE_SUSPENSE_LOADER__';
const isClient = typeof window !== 'undefined' && 'onload' in window;

export function Suspense(props) {
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
    <script dangerouslySetInnerHTML={{ __html: `
      window.${LOADER} && window.${LOADER}.set('${props.id}', ${JSON.stringify(data)})
    ` }}
    />
  );
}

function createDataLoader(serverDataLoader, dataLoader, id) {
  let done = false;
  let promise: Promise<any> | null = null;
  let data = null;

  return {
    read() {
      if (isClient && window[LOADER] && window[LOADER].has(id)) {
        // @ts-ignore
        return window[LOADER].get(id);
      }

      if (done) {
        return data;
      }

      if (promise) {
        throw promise;
      }

      if (serverDataLoader) {
        promise = serverDataLoader();
      } else if (dataLoader) {
        promise = dataLoader();
      } else if (isClient) {
        const globalLoader = getGlobalDataLoader();

        if (globalLoader) {
          promise = globalLoader.getData(id);
        }
      }

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