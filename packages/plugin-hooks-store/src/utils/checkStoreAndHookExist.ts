import * as fse from 'fs-extra';
import { getAppHooksPath, getAppHooksStorePath, getPageHookPath, getPageHookStorePath } from './getPath';
import { ProjectType } from './types';

export default ({
  rootDir,
  srcDir,
  projectType,
  applyMethod,
}: {
  rootDir: string;
  srcDir: string;
  projectType: ProjectType;
  applyMethod: (apiName: string, rootDir: string, srcDir: string) => string[];
}) => {
  const pagesPath = applyMethod('getPages', rootDir, srcDir);
  const appStoreFilePath = getAppHooksStorePath({ rootDir, srcDir, projectType });
  const appModelsDir = getAppHooksPath({ rootDir, srcDir });

  return (
    fse.pathExistsSync(appStoreFilePath) ||
    fse.pathExistsSync(appModelsDir) ||
    pagesPath.some((pagePath: string) => {
      const pageStoreFilePath = getPageHookStorePath({ rootDir, srcDir, pagePath, projectType });
      const { pageHooksDir, pageHooksFile } = getPageHookPath({ rootDir, srcDir, pagePath, projectType });

      return fse.pathExistsSync(pageStoreFilePath) || fse.pathExistsSync(pageHooksDir) || fse.pathExistsSync(pageHooksFile);
    })
  );
};
