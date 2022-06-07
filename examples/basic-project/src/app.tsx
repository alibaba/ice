import type { Auth } from '@ice/plugin-auth/esm/runtime';

if (process.env.ICE_CORE_ERROR_BOUNDARY === 'true') {
  console.error('__REMOVED__');
}

console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');
console.log('process.env.HAHA', process.env.HAHA);

export const auth: Auth = () => {
  return new Promise((resolve) => {
    resolve({
      initialAuth: {
        admin: true,
      },
    });
  });
};

export default {
  app: {
    rootId: 'app',
  },
};
