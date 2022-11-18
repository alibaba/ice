import React, { Suspense, lazy } from 'react';
import { DataContextProvider } from '../components/DataContext';

const Comments = lazy(() => import('../components/Comments' /* webpackPrefetch: true */));

function createServerData() {
  let done = false;
  let promise: Promise<any> | null = null;

  return {
    read() {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        return window.fakeData;
      }

      if (done) {
        const fakeData = [
          "Wait, it doesn't wait for React to load?",
          'How does this even work?',
          'I like marshmallows',
        ];

        return fakeData;
      }
      if (promise) {
        throw promise;
      }

      promise = new Promise((resolve) => {
        setTimeout(() => {
          done = true;
          promise = null;
          resolve(null);
        }, 5000);
      });

      throw promise;
    },
  };
}

export default function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <DataContextProvider value={createServerData()} >
        <Suspense fallback={<div>Loading...</div>}>
          <Comments />
        </Suspense>
      </DataContextProvider>
    </div>
  );
}