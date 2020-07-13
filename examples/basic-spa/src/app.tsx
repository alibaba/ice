import React from 'react';
import { runApp } from 'ice';

console.log(runApp);

runApp({
  app: {
    rootId: 'ice-container',
    errorBoundary: true,
    parseSearchParams: true
  },
  router: {
    basename: '/ice',
    type: 'hash',
    fallback: <div>加载中...</div>
  },
});
