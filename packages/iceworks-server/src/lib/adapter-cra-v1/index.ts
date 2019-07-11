/**
 * create-react-app + kit 3.0
 */
import { checkAliInternal } from 'ice-npm-utils';
import getBaseAdapter from '../adapter';
import Task from './modules/task';

export default async (i18n) => {
  const baseAdapter = await getBaseAdapter(i18n);
  const adapter = {
    ...baseAdapter,
    Task: {
      ...baseAdapter.Task,
      module: Task
    },
  };
  // Customized configuration provided by create-react-app is not supported in iceworks
  delete adapter.Configuration;

  const isAliInternal = await checkAliInternal();
  const filteredPanels = isAliInternal ? ['OSS'] : ['DEF'];
  Object.keys(adapter).forEach((name) => {
    if (filteredPanels.indexOf(name) > -1) {
      delete adapter[name];
    }
  });
  return adapter;
};
