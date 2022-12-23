import type { Manifest } from '@ice/plugin-pha/esm/types';

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
    'test',
  ],
};

export default {
  app: {
    rootId: 'app',
  },
};
