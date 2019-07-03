/**
 * icescripts 2.0 + kit 3.0
 */
import { checkAliInternal } from 'ice-npm-utils';
import getBaseAdapter from '../adapter';

export default async (i18n) => {
  const baseAdapter = await getBaseAdapter(i18n);
  const adapter = {
    ...baseAdapter
  };

  const isAliInternal = await checkAliInternal();
  const filteredPanels = isAliInternal ? ['OSS'] : ['DEF'];
  Object.keys(adapter).forEach((name) => {
    if (filteredPanels.indexOf(name) > -1) {
      delete adapter[name];
    }
  });
  return adapter;
};
