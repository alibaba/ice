import React from 'react';
import type { RunClientAppOptions } from '@ice/runtime-kit';
import { getAppConfig } from '@ice/runtime-kit';

import ReactDOM from 'react-dom';

const runClientApp = (options: RunClientAppOptions) => {
  const { basename = '', createRoutes } = options;
  // Normalize pathname with leading slash
  const pathname = `/${window.location.pathname.replace(basename, '').replace(/^\/+/, '')}`;

  const routes = createRoutes?.({ renderMode: 'CSR' });
  const Component = routes?.find(route => route.path === pathname)?.component;

  ReactDOM.render(
    Component ? <Component /> : <div>404</div>,
    document.getElementById('ice-container'),
  );
};

export {
  getAppConfig,
  runClientApp,
};
