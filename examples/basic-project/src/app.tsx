import { defineAppConfig } from 'ice';
import { defineAuthConfig } from '@ice/plugin-auth/esm/types';

if (process.env.ICE_CORE_ERROR_BOUNDARY === 'true') {
  console.error('__REMOVED__');
}

console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');
console.log('process.env.HAHA', process.env.HAHA);

export const auth = defineAuthConfig(() => {
  // fetch auth data
  return {
    initialAuth: {
      admin: true,
    },
  };
});

export default defineAppConfig({
  app: {
    rootId: 'app',
  },
});
