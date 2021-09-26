import { getAppStorePath, getPageDir, getPageStorePath } from './getPath';

function checkStoreExists(srcPath: string, pagesName: string[]) {
  const appStoreExists = checkAppStoreExists(srcPath);
  const pageStoreExists = checkPageStoreExists(srcPath, pagesName);
  return appStoreExists || pageStoreExists;
}

function checkAppStoreExists(srcPath: string) {
  const appStorePath = getAppStorePath(srcPath);
  return !!appStorePath;
}

function checkPageStoreExists(srcPath: string, pagesName: string[]) {
  return pagesName.some((pageName: string) => {
    const pageDir = getPageDir(srcPath, pageName);
    const pageStorePath = getPageStorePath(pageDir);
    return !!pageStorePath;
  });
}

export default checkStoreExists;
