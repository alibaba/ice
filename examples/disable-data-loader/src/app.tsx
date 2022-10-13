import { defineAppConfig } from 'ice';
import type { GetAppData } from 'ice';

export default defineAppConfig({
  app: {
    rootId: 'app',
  },
});

export const getAppData: GetAppData = () => {
  return new Promise((resolve) => {
    resolve({
      title: 'gogogogo',
      auth: {
        admin: true,
      },
    });
  });
};