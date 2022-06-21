import type { Manifest } from '@ice/plugin-pha/esm/types';

export const phaManifest: Manifest = {
  appWorker: {
    url: 'app-worker.ts',
  },
};

export default {
  app: {
    rootId: 'app',
  },
};
