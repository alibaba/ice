import * as path from 'path';
import fse from 'fs-extra';
import { ROUTER_MANIFEST } from '../constant.js';

function getRouterManifest(rootDir: string) {
  const routeManifest = path.join(rootDir, ROUTER_MANIFEST);
  return JSON.parse(fse.readFileSync(routeManifest, 'utf8'));
}

export default getRouterManifest;