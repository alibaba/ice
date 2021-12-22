import * as path from 'path';
import * as fse from 'fs-extra';
import { getStoreFileType } from './getFileType';

export function getAppStorePath(srcPath: string) {
  const storeFileType = getStoreFileType(srcPath);
  // e.g: src/store.ts
  return storeFileType ? path.join(srcPath, `store${storeFileType}`) : '';
}

/**
 * return absolute page dir path. e.g.: /project/src/pages/Home
 */
export function getPageDir(srcPath: string, pageName: string) {
  const pagesDir = path.join(srcPath, 'pages');
  const pagePath = path.join(pagesDir, pageName);
  // if page path is /src/pages/index.tsx, return /src/pages
  return fse.pathExistsSync(pagePath) ? pagePath : pagesDir;
}

export function getPageStorePath(pagePath: string) {
  const storeFileType = getStoreFileType(pagePath);
  // e.g: src/pages/Home/store.ts
  return storeFileType ? path.join(pagePath, `store${storeFileType}`) : '';
}
