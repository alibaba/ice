/**
 * create-react-app + kit 3.0
 */
import { checkAliInternal } from 'ice-npm-utils';
import getBaseAdapter from '../adapter';
import Router from './modules/router';

export default async (i18n) => {
  const baseAdapter = await getBaseAdapter(i18n);

  /* The configuration module is not used because the customized configuration provided by
  create-react-app is not supported in iceworks */
  const adapter = {
    Guide: baseAdapter.Guide,
    Layout: baseAdapter.Layout,
    Page: baseAdapter.Page,
    Menu: baseAdapter.Menu,
    QuickDev: baseAdapter.QuickDev,
    QuickBuild: baseAdapter.QuickBuild,
    Git: baseAdapter.Git,
    OSS: baseAdapter.OSS,
    Todo: baseAdapter.Todo,
    Dependency: baseAdapter.Dependency,
    Task: baseAdapter.Task,
    Router: {
      ...baseAdapter.Router,
      module: Router,
    },
  };

  return adapter;
};
