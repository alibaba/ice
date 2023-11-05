import { defineAppConfig } from 'ice';

export default defineAppConfig({
  app: {
    rootId: 'app',
  },
  cache: {
    firstChunk: false,
    snapshot: true,
  },
});
