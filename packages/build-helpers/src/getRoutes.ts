import * as fs from 'fs-extra';
import * as path from 'path';

interface IRoute {
  targets?: string[];
  source: string;
  path: string;
}
interface IStaticConfig {
  routes: IRoute[];
  window: any;
}

// Get entries when exist app.json
export default function (api, target) {
  const { context } = api;
  const { rootDir } = context;
  const appJSON = fs.readFileSync(path.join(rootDir, 'src/app.json')) as any;
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
