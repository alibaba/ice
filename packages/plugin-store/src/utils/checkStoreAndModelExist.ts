import * as fse from 'fs-extra';
import { getAppModelsPath, getAppStorePath, getPageModelPath, getPageStorePath } from './getPath';

export default ({ rootDir, srcDir, projectType, applyMethod }) => {
  const pageNames = applyMethod('getPages', rootDir, srcDir);
  const appStoreFilePath = getAppStorePath({ rootDir, srcDir, projectType });
  const appModelsDir = getAppModelsPath({ rootDir, srcDir });

  return fse.pathExistsSync(appStoreFilePath) ||
      fse.pathExistsSync(appModelsDir) ||
      pageNames.some(pageName => {
        const pageStoreFilePath = getPageStorePath({rootDir, srcDir, pageName, projectType });
        const { pageModelsDir, pageModelFile } = getPageModelPath({rootDir, srcDir, pageName, projectType });

        return fse.pathExistsSync(pageStoreFilePath) ||
          fse.pathExistsSync(pageModelsDir) ||
          fse.pathExistsSync(pageModelFile);
      });
};
