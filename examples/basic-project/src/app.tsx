import type { AppConfig } from 'ice';

const appConfig: AppConfig = {
  app: {
    getInitialData: async (ctx) => {
      console.log(ctx);
      return {
        auth: {
          admin: true,
        },
      };
    },
  },
};
export default appConfig;
