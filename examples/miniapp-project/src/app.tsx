import { defineAppConfig, defineDataLoader } from 'ice';

export const dataLoader = defineDataLoader(() => {
  return new Promise((resolve) => {
    resolve({
      success: true,
      id: 34293,
    });
  });
});

export const miniappManifest = {
  title: 'miniapp test',
  routes: [
    'index',
    'about',
    'second/profile',
  ],
};

export default defineAppConfig(() => ({
  app: {
    rootId: 'app',
  },
}));
