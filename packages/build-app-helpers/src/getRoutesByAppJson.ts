import * as fs from 'fs-extra';

interface IRoute {
  targets?: string[];
  source: string;
  path: string;
}
interface IStaticConfig {
  routes: IRoute[];
  window: any;
}

interface IOptions {
  appJsonPath?: string;
  appJsonContent?: string;
}

// Get entries when exist app.json
export default function (target, { appJsonPath, appJsonContent }: IOptions) {
  const appJSON = appJsonContent || fs.readFileSync(appJsonPath) as any;
  const staticConfig: IStaticConfig = JSON.parse(appJSON);

  if (!staticConfig.routes || !Array.isArray(staticConfig.routes)) {
    throw new Error('routes should be an array in app.json.');
  }

  return staticConfig.routes.filter((route) => {
    if (Array.isArray(route.targets) && !route.targets.includes(target)) {
      return false;
    }

    return true;
  });
}
