import * as path from 'path';
import { RUNTIME_TMP_DIR } from '../constant.js';
import getServerEntry from './getServerEntry.js';
import { formatServerEntry } from './multipleEntry.js';

function getEntryPoints(rootDir: string, routes: string[], mainEntry: string) {
  const serverEntry: Record<string, string> = {};
  routes.forEach((route) => {
    serverEntry[`pages${route === '/' ? '/index' : route}`] =
      path.join(rootDir, RUNTIME_TMP_DIR, formatServerEntry(route));
  });
  serverEntry.index = getServerEntry(rootDir, mainEntry);

  return serverEntry;
}

export default getEntryPoints;
