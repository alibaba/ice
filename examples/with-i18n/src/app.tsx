import { defineAppConfig } from 'ice';
import { defineI18nConfig } from '@ice/plugin-i18n/types';

export default defineAppConfig(() => ({
  router: {
    basename: '/app',
  },
}));

export const i18nConfig = defineI18nConfig(() => ({
  // blockCookie: true,
}));
