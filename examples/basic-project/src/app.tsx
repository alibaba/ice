import { defineAppConfig, defineDataLoader } from 'ice';
import { isWeb, isNode } from '@uni/env';

if (process.env.ICE_CORE_ERROR_BOUNDARY === 'true') {
  console.error('__REMOVED__');
}

console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');

console.log('process.env.HAHA', process.env.HAHA);
console.log('HAHA', HAHA);
console.log('process.env.NODE_ENV', process.env.ICE_ENV);
console.log('process.env.undefinedEnv', process.env.undefinedEnv);
console.log('import.meta.target', import.meta.target);
console.log('process.env', process.env);

import('./standard-module')
  .then((mod) => {
    mod.printOne();
  });

if (isWeb) {
  console.error('__IS_WEB__');
}

if (isNode) {
  console.error('__IS_NODE__');
}

export default defineAppConfig(() => ({
  app: {
    rootId: 'app',
  },
}));

export const dataLoader = defineDataLoader(() => {
  return new Promise((resolve) => {
    resolve({
      title: 'gogogogo',
    });
  });
});

export const documentData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: 'documentData',
      });
    }, 1000);
  });
};
