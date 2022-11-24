import { Suspense, createContext, useContext } from 'react';

const LOADER = '__ICE_SUSPENSE_LOADER__';

if (typeof window !== 'undefined') {
  window[LOADER] = new Map();
}

const DataContext = createContext<any>(undefined);

DataContext.displayName = 'DataContext';

export function useSuspenseData() {
  const dataLoader = useContext(DataContext);
  return dataLoader.read();
}

export function IceSuspense(props) {
  const { module } = props;

  const { serverDataLoader, dataLoader, routerId, Loading } = module;

  const Children = module.default;

  const data = createDataLoader(serverDataLoader, dataLoader, routerId);

  return (
    <DataContext.Provider value={data}>
      <Suspense fallback={Loading ? <Loading /> : null}>
        <>
          <Data id={routerId} />
          <Children />
        </>
      </Suspense>
    </DataContext.Provider>
  );
}

function Data(props) {
  const data = useSuspenseData();

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
      if (typeof window !== 'undefined' && window[LOADER]) {
        // @ts-ignore
        return window[LOADER].get(id);
      }

      if (done) {
        return data;
      }

      if (promise) {
        throw promise;
      }

      promise = serverDataLoader ? serverDataLoader() : dataLoader();

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