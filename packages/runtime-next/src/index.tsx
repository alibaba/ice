import React from 'react';
import ReactDOM from 'react-dom/client';
import { defineAppConfig, getAppConfig } from '@ice/runtime-kit';
import type { RunClientAppOptions } from '@ice/runtime-kit';
import { RouterProvider, createRouter } from '@tanstack/react-router';

const DEFAULT_ROOT_ID = 'ice-container';
const DEFAULT_STALE_TIME = 5000;

const runClientApp = (options: RunClientAppOptions) => {
  const { createRoutes } = options;

  // Create router with optimized defaults
  const router = createRouter({
    routeTree: createRoutes,
    defaultPreload: 'intent',
    defaultStaleTime: DEFAULT_STALE_TIME,
    scrollRestoration: true,
  });

  // Get root element, warn if missing
  const rootElement = document.getElementById(DEFAULT_ROOT_ID);
  if (!rootElement) {
    console.warn(`Root element #${DEFAULT_ROOT_ID} not found`);
    return;
  }

  // Create root and render app
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />,
  );
};

export {
  defineAppConfig,
  runClientApp,
  getAppConfig,
};
