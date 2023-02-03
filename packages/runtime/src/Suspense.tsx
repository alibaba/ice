import * as React from 'react';
import type { ReactNode } from 'react';

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

type Request = () => Promise<any>;

const SuspenseContext = React.createContext<SuspenseState | undefined>(undefined);

export function useSuspenseData(request?: Request) {
  const suspenseState = React.useContext(SuspenseContext);

  const { data, done, promise, update, error, id } = suspenseState;

  // use data from server side directly when hydrate.
  if (isClient && (window[LOADER] as Map<string, any>) && window[LOADER].has(id)) {
    return window[LOADER].get(id);
  }

  if (done) {
    return data;
  }

  if (error) {
    throw error;
  }

  // request is pending.
  if (promise) {
    throw promise;
  }

  // when called by Data, request is null.
  if (!request) {
    return null;
  }

  // send request and throw promise
  const thenable = request();

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

    const suspenseState = {
      id: id,
      data: null,
      done: false,
      promise: null,
      error: null,
      update: (value) => {
        Object.assign(suspenseState, value);
      },
    };

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