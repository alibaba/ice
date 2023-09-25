import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import pkg from 'react-server-dom-webpack/client';

// @ts-ignore
const { Suspense, use, useState, createContext, useContext, startTransition } = React;
const { createFromFetch, createFromReadableStream } = pkg;

export async function runRSCClientApp() {
  const container = document.getElementById('app');
  const root = ReactDOM.createRoot(container);
  root.render(<Root />);
}

function Root() {
  return (
    <ServerRoot cacheKey={getCacheKey()} />
  );
}

const RouterContext = createContext(null);
const initialCache = new Map();

function Router() {
  const [cache, setCache] = useState(initialCache);
  const [location, setLocation] = useState(window.location.href);

  let content = cache.get(location);
  if (!content) {
    content = createFromFetch(
      getReactTree(location),
    );
    cache.set(location, content);
  }

  function refresh() {
    startTransition(() => {
      const nextCache = new Map();
      const nextContent = createFromFetch(
        getReactTree(location),
      );
      nextCache.set(location, nextContent);
      setCache(nextCache);
    });
  }

  return (
    <RouterContext.Provider value={{ location, refresh }}>
      <Suspense fallback={<h1>Loading...</h1>}>
        {use(content)}
      </Suspense>
    </RouterContext.Provider>
  );
}

export function useRefresh() {
  const router = useContext(RouterContext);
  return router.refresh;
}

function getReactTree(location) {
  return fetch(location + location.indexOf('?') ? '?rsc' : '&rsc');
}

const getCacheKey = () => {
  const { pathname, search } = location;
  return pathname + search;
};

const encoder = new TextEncoder();

let initialServerDataBuffer: string[] | undefined = [];
let initialServerDataWriter: ReadableStreamDefaultController | undefined;
let initialServerDataLoaded = false;
let initialServerDataFlushed = false;

function nextServerDataRegisterWriter(ctr: ReadableStreamDefaultController) {
  if (initialServerDataBuffer) {
    initialServerDataBuffer.forEach((val) => {
      ctr.enqueue(encoder.encode(val));
    });
    if (initialServerDataLoaded && !initialServerDataFlushed) {
      ctr.close();
      initialServerDataFlushed = true;
      initialServerDataBuffer = undefined;
    }
  }

  initialServerDataWriter = ctr;
}

function createResponseCache() {
  return new Map<string, any>();
}
const rscCache = createResponseCache();

function useInitialServerResponse(cacheKey: string): Promise<JSX.Element> {
  const response = rscCache.get(cacheKey);
  if (response) return response;

  const readable = new ReadableStream({
    start(controller) {
      nextServerDataRegisterWriter(controller);
    },
  });

  const newResponse = createFromReadableStream(readable);

  rscCache.set(cacheKey, newResponse);
  return newResponse;
}

function ServerRoot({ cacheKey }: { cacheKey: string }): JSX.Element {
  React.useEffect(() => {
    rscCache.delete(cacheKey);
  });
  const response = useInitialServerResponse(cacheKey);
  const root = use(response);
  return root;
}

const DOMContentLoaded = function () {
  if (initialServerDataWriter && !initialServerDataFlushed) {
    initialServerDataWriter.close();
    initialServerDataFlushed = true;
    initialServerDataBuffer = undefined;
  }
  initialServerDataLoaded = true;
};

const nextServerDataLoadingGlobal = typeof self !== 'undefined' ? (((self as any).__next_f =
  (self as any).__next_f || [])) : [];
nextServerDataLoadingGlobal.forEach(nextServerDataCallback);
nextServerDataLoadingGlobal.push = nextServerDataCallback;

function nextServerDataCallback(
  seg: [isBootStrap: 0] | [isNotBootstrap: 1, responsePartial: string],
): void {
  if (seg[0] === 0) {
    initialServerDataBuffer = [];
  } else {
    // if (!initialServerDataBuffer)
    //   throw new Error('Unexpected server data: missing bootstrap script.')

    if (initialServerDataWriter) {
      initialServerDataWriter.enqueue(encoder.encode(seg[1]));
    } else {
      initialServerDataBuffer.push(seg[1]);
    }
  }
}

// It's possible that the DOM is already loaded.
if (typeof document !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
} else {
  DOMContentLoaded();
}