import React from 'react';
import { runApp } from 'ice';

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
  onShow() {
    console.log('app show...');
  },
  onHide() {
    console.log('app hide...');
  },
});
