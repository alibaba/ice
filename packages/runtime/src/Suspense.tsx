import * as React from 'react';
import { DataProvider, useData } from './RouteContext.js';
import { isClient } from './env.js';
import { getGlobalDataLoader } from './dataLoader.js';

const LOADER = '__ICE_SUSPENSE_LOADER__';

export function Suspense(props) {
  const { module, id } = props;

  const { serverDataLoader, dataLoader, Loading } = module;

  const Children = module.default;

  const data = createDataLoader(serverDataLoader, dataLoader, id);

  return (
    <DataProvider value={data}>
      <React.Suspense fallback={Loading ? <Loading /> : null}>
        <>
          <Data id={id} />
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
    console.log('set data', '${props.id}');
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