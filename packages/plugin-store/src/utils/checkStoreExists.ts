import * as fse from 'fs-extra';
import { getAppStorePath, getPageStorePath } from './getPath';

function checkStoreExists(srcPath: string, pagesName: string[]) {
  const appStoreExists = checkAppStoreExists(srcPath);
  const pageStoreExists = checkPageStoreExists(srcPath, pagesName);
  return appStoreExists || pageStoreExists;
}

function checkAppStoreExists(srcPath: string) {
  const appStorePath = getAppStorePath(srcPath);
  return fse.pathExistsSync(appStorePath);
}

function checkPageStoreExists(srcPath: string, pagesName: string[]) {
  return pagesName.some((pageName: string) => {
    const pageStorePath = getPageStorePath(srcPath, pageName);
    return fse.pathExistsSync(pageStorePath);
  });
}

export default checkStoreExists;
