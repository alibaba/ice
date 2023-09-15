import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import pkg from 'react-server-dom-webpack/client';

// @ts-ignore
const { Suspense, use, useState, createContext, useContext, startTransition } = React;
const { createFromFetch } = pkg;

export async function runRSCClientApp() {
  const container = document.getElementById('app');
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

  // function navigate(nextLocation) {
  //   startTransition(() => {
  //     setLocation(loc => ({
  //       ...loc,
  //       ...nextLocation
  //     }));
  //   });
  // }

  return (
    <RouterContext.Provider value={{ location, refresh }}>
      <Suspense fallback={<h1>Loading...</h1>}>
        {use(content)}
      </Suspense>
    </RouterContext.Provider>
  );
}

export function useRSCRouter() {
  return useContext(RouterContext);
}

function getReactTree(location) {
  return fetch(location + location.indexOf('?') ? '?rsc' : '&rsc');
}