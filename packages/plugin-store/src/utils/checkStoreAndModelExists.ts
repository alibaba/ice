import * as fse from 'fs-extra';
import { generateAppModelsPath, generateAppStorePath, generatePageModelPath, generatePageStorePath } from './generatePath';

export default (rootDir: string, srcDir: string, projectType: string, pagesName: string[]) => {
  const appStoreFilePath = generateAppStorePath(rootDir, srcDir, projectType);
  const appModelsDir = generateAppModelsPath(rootDir, srcDir);

  return fse.pathExistsSync(appStoreFilePath) ||
      fse.pathExistsSync(appModelsDir) ||
      pagesName.some(pageName => {
        const pageStoreFilePath = generatePageStorePath(rootDir, srcDir, pageName, projectType);
        const { pageModelsDir, pageModelFile } = generatePageModelPath(rootDir, srcDir, pageName, projectType);

        return fse.pathExistsSync(pageStoreFilePath) ||
          fse.pathExistsSync(pageModelsDir) ||
          fse.pathExistsSync(pageModelFile);
      });
};
