import * as fse from 'fs-extra';
import * as path from 'path';

export default (rootDir: string, srcDir: string, projectType: string, applyMethod: Function) => {
  const pagesName = applyMethod('getPages', rootDir, srcDir);

  return checkAppStoreExists(rootDir, srcDir, projectType, applyMethod) ||
      checkAppModelsExists(rootDir, srcDir) ||
      pagesName.some(pageName => {
        return checkPageModelsExists(rootDir, srcDir, pageName, projectType) ||
          checkPageStoreExists(rootDir, srcDir, pageName, projectType, applyMethod);
      });
};

export function checkAppStoreExists(rootDir: string, srcDir: string, projectType: string, applyMethod: Function) {
  const appStoreFilePath = applyMethod('formatPath', path.join(rootDir, srcDir, `store.${projectType}`));
  return fse.pathExistsSync(appStoreFilePath);
}

export function checkAppModelsExists(rootDir: string, srcDir: string) {
  const appModelsDir = path.join(rootDir, srcDir, 'models');
  return fse.pathExistsSync(appModelsDir);
}

export function checkPageStoreExists (rootDir: string, srcDir: string, pageName: string, projectType: string, applyMethod: Function) {
  // eg. src/pages/${pageName}/model.ts
  const pageNameDir = path.join(rootDir, srcDir, 'pages', pageName);
  const pageStoreFilePath = applyMethod('formatPath', path.join(pageNameDir, `store.${projectType}`));
  return fse.pathExistsSync(pageStoreFilePath);
}

export function checkPageModelsExists(rootDir: string, srcDir: string, pageName: string, projectType: string) {
  const pageNameDir = path.join(rootDir, srcDir, 'pages', pageName);
  // eg. src/pages/${pageName}/models/*
  const pageModelsDir = path.join(pageNameDir, 'models');
  // eg. src/pages/${pageName}/model.ts
  const pageModelFile = path.join(pageNameDir, `model.${projectType}`);

  return fse.pathExistsSync(pageModelFile) || fse.pathExistsSync(pageModelsDir);
}
