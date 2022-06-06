import { GetAppData, GetAppConfig } from 'ice';

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

export const getAppConfig: GetAppConfig = (appData) => {
  return {
    auth: {
      initialAuth: appData?.auth,
    },
  };
};
