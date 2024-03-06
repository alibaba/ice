import type { Config } from '../types';

interface GetDevtoolOptions<T = any> {
  (sourceMap: Config['sourceMap']): T;
}

const getDevtoolValue: GetDevtoolOptions = (sourceMap) => {
  if (typeof sourceMap === 'string') {
    return sourceMap;
  } else if (sourceMap === false) {
    return false;
  }
  return 'source-map';
};

export default getDevtoolValue;
