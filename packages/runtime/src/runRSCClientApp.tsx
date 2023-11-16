import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import pkg from 'react-server-dom-webpack/client';
import type { AppConfig } from './types.js';

// @ts-ignore
const { Suspense, use } = React;
const { createFromReadableStream } = pkg;

export async function runRSCClientApp(appConfig: AppConfig) {
  // It's possible that the DOM is already loaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
  } else {
    DOMContentLoaded();
  }

  const rscData = (self as any).__rsc_data = (self as any).__rsc_data || [];
  rscData.forEach(serverDataCallback);
  rscData.push = serverDataCallback;

  const rootId = appConfig.app.rootId || 'app';
  const container = document.getElementById(rootId);
  const root = ReactDOM.createRoot(container);
  root.render(<Root />);
}

function Root() {
  const response = useInitialServerResponse(window.location.href);

  return (
    <Suspense>
      {use(response)}
    </Suspense>
  );
}

const rscCache = new Map();

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

let initialServerDataBuffer: string[] | undefined;
let initialServerDataWriter: ReadableStreamDefaultController | undefined;
let initialServerDataLoaded = false;
let initialServerDataFlushed = false;
const encoder = new TextEncoder();

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

// When `DOMContentLoaded`, we can close all pending writers to finish hydration.
const DOMContentLoaded = function () {
  if (initialServerDataWriter && !initialServerDataFlushed) {
    initialServerDataWriter.close();
    initialServerDataFlushed = true;
    initialServerDataBuffer = undefined;
  }
  initialServerDataLoaded = true;
};

function serverDataCallback(seg) {
  if (initialServerDataWriter) {
    initialServerDataWriter.enqueue(encoder.encode(seg));
  } else {
    if (!initialServerDataBuffer) {
      initialServerDataBuffer = [];
    }
    initialServerDataBuffer.push(seg);
  }
}