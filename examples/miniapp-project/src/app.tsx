import { defineAppConfig, type GetAppData } from 'ice';

export const getAppData: GetAppData = () => {
  return new Promise((resolve) => {
    resolve({
      success: true,
      id: 34293,
    });
  });
};

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
