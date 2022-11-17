import { defineAppConfig, defineDataLoader } from 'ice';

export default defineAppConfig(() => ({
  app: {
    rootId: 'app',
  },
}));

export const dataLoader = defineDataLoader(() => {
  return new Promise((resolve) => {
    resolve({
      title: 'gogogogo',
      auth: {
        admin: true,
      },
    });
  });
});
