import * as fse from 'fs-extra';
import { getAppModelsPath, getAppStorePath, getPageModelPath, getPageStorePath, getRaxPagesPath } from './getPath';

export default ({ rootDir, srcDir, projectType, isRax, applyMethod }) => {
  const pagesPath = isRax ? getRaxPagesPath(rootDir) : applyMethod('getPages', rootDir, srcDir);
  const appStoreFilePath = getAppStorePath({ rootDir, srcDir, projectType });
  const appModelsDir = getAppModelsPath({ rootDir, srcDir });

  return fse.pathExistsSync(appStoreFilePath) ||
      fse.pathExistsSync(appModelsDir) ||
      pagesPath.some(pagePath => {
        const pageStoreFilePath = getPageStorePath({rootDir, srcDir, pagePath, projectType, isRax });
        const { pageModelsDir, pageModelFile } = getPageModelPath({rootDir, srcDir, pagePath, projectType, isRax });

        return fse.pathExistsSync(pageStoreFilePath) ||
          fse.pathExistsSync(pageModelsDir) ||
          fse.pathExistsSync(pageModelFile);
      });
};
