import * as fs from 'fs-extra';
import { IRoute } from './types';

interface IStaticConfig {
  routes: IRoute[];
  window?: any;
  tabBar?: any;
}

interface IOptions {
  appJsonPath?: string;
  appJsonContent?: IStaticConfig;
}

// Get entries when exist app.json
export default function (target, { appJsonPath, appJsonContent }: IOptions) {
  let staticConfig: IStaticConfig  = appJsonContent;

  if (appJsonPath) {
    const appJSON = appJsonContent || fs.readFileSync(appJsonPath) as any;
    staticConfig = JSON.parse(appJSON);
  }

  if (!staticConfig.routes || !Array.isArray(staticConfig.routes)) {
    throw new Error('routes should be an array in app.json.');
  }

  const routes = staticConfig.routes.filter((route) => {
    if (Array.isArray(route.targets) && !route.targets.includes(target)) {
      return false;
    }

    return true;
  });

  if (staticConfig?.tabBar?.source) {
    routes.push({
      ...staticConfig.tabBar,
      __tabBar: true,
    });
  }

  return routes;
}
