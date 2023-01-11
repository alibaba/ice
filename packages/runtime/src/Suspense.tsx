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

const SuspenseContext = React.createContext<SuspenseState | undefined>(undefined);

export function useSuspenseData(request?: any) {
  const suspenseState = React.useContext(SuspenseContext);

  const { data, done, promise, update, error, id } = suspenseState;

  if (isClient && (window[LOADER] as Map<string, any>) && window[LOADER].has(id)) {
    return window[LOADER].get(id);
  }

  if (done) {
    return data;
  }

  if (error) {
    throw error;
  }

  if (promise) {
    throw promise;
  }

  if (!request) {
    return null;
  }

  if (!promise) {
    const promise = request();

    promise.then((response) => {
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
      promise,
    });

    throw promise;
  }

  return null;
}

interface SuspenseProps {
  id: string;
  loading?: ReactNode;
  fallback?: ReactNode;
  children: ReactNode;
}

export function Suspense(props: SuspenseProps) {
  const { loading, fallback, id } = props;

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
    <SuspenseContext.Provider value={suspenseState}>
      <React.Suspense fallback={loading || null}>
        <ErrorBoundary fallback={fallback || null}>
          {props.children}
          <Data id={id} />
        </ErrorBoundary>
      </React.Suspense>
    </SuspenseContext.Provider>
  );
}

function Data(props) {
  const data = useSuspenseData();

  return (
    <script dangerouslySetInnerHTML={{ __html: `if (!window.${LOADER}) { window.${LOADER} = new Map();} window.${LOADER}.set('${props.id}', ${JSON.stringify(data)})` }} />
  );
}

type EProps = {
  children: ReactNode[];
  fallback?: ReactNode;
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
      return this.props.fallback;
    }

    return this.props.children;
  }
}