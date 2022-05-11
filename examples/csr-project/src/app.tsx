import { GetAppData, GetAppConfig } from 'ice';

console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');

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
