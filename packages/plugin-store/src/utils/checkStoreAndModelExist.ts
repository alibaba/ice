import * as fse from 'fs-extra';
import { getAppModelsPath, getAppStorePath, getPageModelPath, getPageStorePath } from './getPath';

export default ({ rootDir, srcDir, projectType, applyMethod }) => {
  const pagesPath = applyMethod('getPages', rootDir, srcDir);
  const appStoreFilePath = getAppStorePath({ rootDir, srcDir, projectType });
  const appModelsDir = getAppModelsPath({ rootDir, srcDir });

  return fse.pathExistsSync(appStoreFilePath) ||
      fse.pathExistsSync(appModelsDir) ||
      pagesPath.some(pagePath => {
        const pageStoreFilePath = getPageStorePath({rootDir, srcDir, pagePath, projectType });
        const { pageModelsDir, pageModelFile } = getPageModelPath({rootDir, srcDir, pagePath, projectType });

        return fse.pathExistsSync(pageStoreFilePath) ||
          fse.pathExistsSync(pageModelsDir) ||
          fse.pathExistsSync(pageModelFile);
      });
};
