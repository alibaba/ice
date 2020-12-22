import * as fse from 'fs-extra';
import { getAppModelsPath, getAppStorePath, getPageModelPath, getPageStorePath } from './getPath';

export default ({rootDir, srcDir, projectType, pagesPath, isRax }) => {
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
