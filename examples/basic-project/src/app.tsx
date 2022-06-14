import type { GetAppData, GetAppConfig } from 'ice';

if (process.env.ICE_CORE_ERROR_BOUNDARY === 'true') {
  console.error('__REMOVED__');
}

console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');
console.log('process.env.HAHA', process.env.HAHA);

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
