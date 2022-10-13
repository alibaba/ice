import { defineAppConfig } from '../disable-data-loader/.ice';
import type { GetAppData } from '../disable-data-loader/.ice';

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