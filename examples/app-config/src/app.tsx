import { defineAppConfig } from 'ice';

export default defineAppConfig(() => ({
  app: {
    rootId: 'app',
    strict: true,
    errorBoundary: true,
  },
  router: {
    type: 'browser',
    basename: '/ice',
  },
}));
