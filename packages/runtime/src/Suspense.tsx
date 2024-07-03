import * as React from 'react';
import type { ReactNode } from 'react';
import { useAppContext } from './AppContext.js';
import proxyData from './proxyData.js';
import type { RequestContext } from './types.js';

const LOADER = '__ICE_SUSPENSE_LOADER__';
const isClient = typeof window !== 'undefined' && 'onload' in window;

declare global {
  interface Window {
    [LOADER]: Map<string, any>;
  }
}

interface SuspenseState {
  id: string;
  data?: any;
  done: boolean;
  error?: Error;
  promise?: Promise<any>;
  update: Function;
}

type Request = (ctx: RequestContext) => Promise<any>;

const SuspenseContext = React.createContext<SuspenseState | undefined>(undefined);

const getHydrateData = (id: string) => {
  let data = null;
  const loaderData = isClient && window[LOADER];
  let hasHydrateData: boolean;
  if (loaderData) {
    // Compatible with the old version which use Map to store data.
    if (loaderData.has) {
      hasHydrateData = loaderData.has(id);
      data = window[LOADER].get(id);
    } else {
      hasHydrateData = Object.prototype.hasOwnProperty.call(loaderData, id);
      // If hasHydrateData is false, data will be undefined.
      data = window[LOADER][id];
    }
  }
  return {
    hasHydrateData,
    data,
  };
};

const querySet = new Set<string>();

interface SuspenseDataProps {
  queryKey?: string;
}

export function useSuspenseData(request?: Request, options?: SuspenseDataProps) {
  const appContext = useAppContext();
  const { requestContext } = appContext;
  const suspenseState = React.useContext(SuspenseContext);

  const { data, done, promise, update, error, id } = suspenseState;
  const { hasHydrateData, data: hydrateData } = getHydrateData(id);

  const queryInProcess = options?.queryKey && querySet.has(options.queryKey);
  let thenable: Promise<any> = null;
  if (!hasHydrateData && !error && !done && !promise && request && !queryInProcess) {
    thenable = request(requestContext);
    thenable.then((response) => {
      querySet.delete(options.queryKey);
      update({
        done: true,
        data: response,
        promise: null,
      });
    }).catch(e => {
      querySet.delete(options.queryKey);
      update({
        done: true,
        error: e,
        promise: null,
      });
    });
    if (options.queryKey) {
      querySet.add(options.queryKey);
    }
  }

  React.useEffect(() => {
    // Update state in useEffect, otherwise it will cause bad setState warning.
    if (thenable) {
      update({
        promise: thenable,
      });
    }
  }, [thenable, update]);

  // 1. Use data from server side directly when hydrate.
  if (hasHydrateData) {
    return hydrateData;
  }

  // 2. Check data request error, if error throw it to react.
  if (error) {
    throw error;
  }

  // 3. If request is done, return data.
  if (done) {
    if (process.env.NODE_ENV === 'development' && typeof data === 'object') {
      return proxyData(data);
    }

    return data;
  }

  // 4. If request is pending, throw the promise to react.
  if (promise) {
    throw promise;
  }

  // 5. If no request, return null.
  if (!request) {
    return null;
  }

  if (!isClient) {
    // 6. Create a promise for the request and throw it to react.
    update({
      promise: thenable,
    });
  }
  if (thenable) {
    throw thenable;
  } else {
    // Throw a pending promise to Suspense, otherwise the component will be error because of undefined data.
    throw new Promise(() => {});
  }
}

interface SuspenseProps {
  id: string;
  fallback?: ReactNode;
  [key: string]: any;
}

export function withSuspense(Component) {
  return (props: SuspenseProps) => {
    const { fallback, id, ...componentProps } = props;

    const [suspenseState, updateSuspenseData] = React.useState({
      id: id,
      data: null,
      done: false,
      promise: null,
      error: null,
      update,
    });

    function update(value) {
      let newState: any;
      if (isClient) {
        newState = Object.assign({}, suspenseState, value);
      } else {
        // For SSR, setState is not working, so here we need to update the state manually.
        newState = Object.assign(suspenseState, value);
      }
      // For CSR.
      updateSuspenseData(newState);
    }

    return (
      <React.Suspense fallback={fallback || null}>
        <SuspenseContext.Provider value={suspenseState}>
          <Component {...componentProps} />
          <Data id={id} />
        </SuspenseContext.Provider>
      </React.Suspense>
    );
  };
}

function Data(props) {
  const data = useSuspenseData();

  return (
    <script dangerouslySetInnerHTML={{ __html: `!function(){window['${LOADER}'] = window['${LOADER}'] || {};window['${LOADER}']['${props.id}'] = ${JSON.stringify(data)}}();` }} />
  );
}
