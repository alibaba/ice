import type { AppConfig } from 'ice';

const appConfig: AppConfig = {
  app: {
    getInitialData: async (ctx) => {
      return {
        auth: {
          admin: true,
        },
      };
    },
  },
};
export default appConfig;
