import { defineAppConfig } from 'ice';
import { defineAuthConfig } from '@ice/plugin-auth/esm/types';

console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');

export const authConfig = defineAuthConfig(() => {
  return {
    initialAuth: {
      admin: true,
    },
  };
});

export default defineAppConfig(() => ({}));
