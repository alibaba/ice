/**
 * icescripts 2.0 + kit 3.0
 */
import * as _ from 'lodash';
import { checkAliInternal } from 'ice-npm-utils';
import getBaseAdapter from '../adapter';

export default async (i18n) => {
  const baseAdapter = await getBaseAdapter(i18n);
  const adapter = {
    ...baseAdapter
  };

  const isAliInternal = await checkAliInternal();

  let filteredPanels = [];
  if (isAliInternal) {
    filteredPanels = ['OSS'];
  } else {
    filteredPanels = ['DEF'];
  }

  Object.keys(adapter).forEach((name) => {
    if (filteredPanels.indexOf(name) > -1) {
      delete adapter[name];
    }
  });
  return adapter;
};
