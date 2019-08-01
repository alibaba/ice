/**
 * icescripts 1.0 + kit 1.0
 */
import { checkAliInternal } from 'ice-npm-utils';
import getBaseAdapter from '../adapter';

export default async (i18n) => {
  const baseAdapter = await getBaseAdapter(i18n);
  const {
    Guide,
    Layout,
    Page,
    QuickDev,
    QuickBuild,
    Git,
    OSS,
    DEF,
    Todo,
    Dependency,
    Task,
  } = baseAdapter;

  const adapter = {
    Guide,
    Layout,
    Page,
    QuickDev,
    QuickBuild,
    Git,
    OSS,
    DEF,
    Todo,
    Dependency,
    Task,
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
