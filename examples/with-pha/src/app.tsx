import type { Manifest } from '@ice/plugin-pha/esm/types';

export const phaManifest: Manifest = {
  appWorker: {
    url: 'app-worker.ts',
  },
  routes: [
    {
      pageHeader: {},
      frames: [
        'blog',
        'home',
      ],
    },
    'home',
    'about',
  ],
};

export default {
  app: {
    rootId: 'app',
  },
};
