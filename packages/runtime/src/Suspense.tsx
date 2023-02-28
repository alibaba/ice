import * as React from 'react';
import type { ReactNode } from 'react';
import { useAppContext } from './AppContext.js';
import type { RequestContext } from './types.js';

const LOADER = '__ICE_SUSPENSE_LOADER__';
const isClient = typeof window !== 'undefined' && 'onload' in window;

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

export function useSuspenseData(request?: Request) {
  const appContext = useAppContext();
  const { requestContext } = appContext;
  const suspenseState = React.useContext(SuspenseContext);

  const { data, done, promise, update, error, id } = suspenseState;

  // 1. Use data from server side directly when hydrate.
  if (isClient && (window[LOADER] as Map<string, any>) && window[LOADER].has(id)) {
    return window[LOADER].get(id);
  }

  // 2. Check data request error, if error throw it to react.
  if (error) {
    throw error;
  }

  // 3. If request is done, return data.
  if (done) {
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

  // 6. Create a promise for the request and throw it to react.
  const thenable = request(requestContext);

  thenable.then((response) => {
    update({
      done: true,
      data: response,
      promise: null,
    });
  }).catch(e => {
    update({
      done: true,
      error: e,
      promise: null,
    });
  });

  update({
    promise: thenable,
  });

  throw thenable;
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
      // For SSR, setState is not working, so here we need to update the state manually.
      const newState = Object.assign(suspenseState, value);
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
    <script dangerouslySetInnerHTML={{ __html: `if (!window.${LOADER}) { window.${LOADER} = new Map();} window.${LOADER}.set('${props.id}', ${JSON.stringify(data)})` }} />
  );
}