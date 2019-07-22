import { checkAliInternal } from 'ice-npm-utils';
import storage from './storage';

const getNpmClient = async () => {
  const originClientValue = storage.get('npmClient');
  let registry = '';
  let npmClient = originClientValue;
  if (!npmClient) {
    // set default npm client
    npmClient = await checkAliInternal() ? 'tnpm' : 'npm';
    storage.set('npmClient', npmClient);
  } else if (npmClient === 'custom') {
    registry = storage.get('registry');
    npmClient = 'npm';
  }
  return [npmClient, registry, originClientValue];
};

export default getNpmClient;