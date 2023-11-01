import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import pkg from 'react-server-dom-webpack/client';
import type { AppConfig } from './types.js';

// @ts-ignore
const { Suspense, use, useState, createContext, useContext, startTransition } = React;
const { createFromFetch } = pkg;

export async function runRSCClientApp(appConfig: AppConfig) {
  const rootId = appConfig.app.rootId || 'app';
  const container = document.getElementById(rootId);
  const root = ReactDOM.createRoot(container);
  root.render(<Root />);
}

function Root() {
  return (
    <Router />
  );
}

const RouterContext = createContext(null);
const initialCache = new Map();

function Router() {
  const [cache, setCache] = useState(initialCache);
  const [location] = useState(window.location.href);

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
  return fetch(location + (location.indexOf('?') > -1 ? '&rsc=true' : '?rsc=true'));
}