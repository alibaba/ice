import { defineAppConfig } from 'ice';
import { defineAuthConfig } from '@ice/plugin-auth/types';

export const authConfig = defineAuthConfig(() => {
  return {
    initialAuth: {
      admin: true,
    },
  };
});

export default defineAppConfig(() => ({}));
