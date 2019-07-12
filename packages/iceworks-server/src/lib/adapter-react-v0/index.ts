/**
 * icescripts 1.0 + kit 1.0
 */
import { checkAliInternal } from 'ice-npm-utils';
import getBaseAdapter from '../adapter';

export default async (i18n) => {
  const baseAdapter = await getBaseAdapter(i18n);
  const adapter = {
    Guide: baseAdapter.Guide,
    Layout: baseAdapter.Layout,
    Page: baseAdapter.Page,
    QuickDev: baseAdapter.QuickDev,
    QuickBuild: baseAdapter.QuickBuild,
    Git: baseAdapter.Git,
    OSS: baseAdapter.OSS,
    DEF: baseAdapter.DEF,
    Todo: baseAdapter.Todo,
    Dependency: baseAdapter.Dependency,
    Task: baseAdapter.Task,
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
