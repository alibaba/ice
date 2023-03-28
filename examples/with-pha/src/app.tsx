import type { Manifest } from '@ice/plugin-pha/types';

export const phaManifest: Manifest = {
  title: 'test',
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
    'custom',
  ],
};

export default {
  app: {
    rootId: 'app',
  },
};
