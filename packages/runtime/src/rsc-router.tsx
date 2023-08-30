'use client';
// @ts-ignore
import React, {
  createContext,
  startTransition,
  useContext,
  useState,
  useEffect,
  ReactElement,
  Suspense,
} from 'react';
import pkg from 'react-server-dom-webpack/client';
import { ClientAppRouterProps } from './types.js';
import AppErrorBoundary from './AppErrorBoundary.js';
const { createFromFetch, createFromReadableStream } = pkg;

console.log('use route');
const RouterContext = createContext<any>(null);
const initialCache = new Map();

export function RSCRouter(): React.ReactElement {
  const [cache, setCache] = useState(initialCache);
  // const [location, setLocation] = useState({
  //   param: 'param'
  // });

  const locationKey = JSON.stringify(location);
  let content = cache.get(locationKey);
  if (!content) {
    console.log('createFromFetch');
    content = createFromFetch(
      // fetch('/app?location=' + encodeURIComponent(locationKey))
      fetch('/rsc'),
    );
    // cache.set(locationKey, content);
  }

  function refresh(response) {
    startTransition(() => {
      const nextCache = new Map();
      if (response != null) {
        const locationKey = response.headers.get('X-Location');
        const nextLocation = JSON.parse(locationKey);
        const nextContent = createFromReadableStream(response.body);
        nextCache.set(locationKey, nextContent);
        navigate(nextLocation);
      }
      setCache(nextCache);
    });
  }

  function navigate(nextLocation) {
    startTransition(() => {
      // setLocation(loc => ({
      //   ...loc,
      //   ...nextLocation
      // }));
    });
  }

  const [finalContent, setFinalContent] = useState(null);
  useEffect(() => {
    content.then((res: any) => {
      console.log('content res', res);
      setFinalContent(res);
    }, (e): any => {
      console.error(e);
    });
  }, []);

  return (
    <AppErrorBoundary>
      <RouterContext.Provider value={{ location, navigate, refresh }}>
        <div>123</div>
        <Suspense fallback={<div>loading...</div>}>
          {finalContent}
          {/* {use(content)} */}
        </Suspense>
      </RouterContext.Provider>
    </AppErrorBoundary>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function useMutation({ endpoint, method }) {
  const { refresh } = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [didError, setDidError] = useState(false);
  const [error, setError] = useState(null);
  if (didError) {
    // Let the nearest error boundary handle errors while saving.
    throw error;
  }

  async function performMutation(payload, requestedLocation) {
    setIsSaving(true);
    try {
      const response = await fetch(
        `${endpoint}?location=${encodeURIComponent(
          JSON.stringify(requestedLocation),
        )}`,
        {
          method,
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }
      refresh(response);
    } catch (e) {
      setDidError(true);
      setError(e);
    } finally {
      setIsSaving(false);
    }
  }

  return [isSaving, performMutation];
}