import { checkAliInternal } from 'ice-npm-utils';
import storage from './storage';

const getNpmClient = async () => {
  let npmClient = storage.get('npmClient');
  if (!npmClient) {
    // set default npm client
    npmClient = await checkAliInternal() ? 'tnpm' : 'npm';
    storage.set('npmClient', npmClient);
  }
  return npmClient;
};

export default getNpmClient;