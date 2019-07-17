import { checkAliInternal } from 'ice-npm-utils';

const getStorageNpmClient = async (storage: any) => {
  let npmClient = storage.get('npmClient');
  if (!npmClient) {
    // set default npm client
    npmClient = await checkAliInternal() ? 'tnpm' : 'npm';
    storage.set('npmClient', npmClient);
  }
  return npmClient;
};

export default getStorageNpmClient;