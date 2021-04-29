import * as path from 'path';
import * as fse from 'fs-extra';

export function getAppStorePath({ rootDir, srcDir, projectType }) {
  // e.g: src/store.ts
  const appStoreFilePath = path.join(rootDir, srcDir, `store.${projectType}`);
  return appStoreFilePath;
}

export function getAppModelsPath({ rootDir, srcDir }) {
  // e.g: src/models/*
  return path.join(rootDir, srcDir, 'models');
}

/**
 * return absolute page path. e.g.: /project/src/pages/Home
 */
export function getPagePath({ rootDir, srcDir, pageName }) {
  return path.join(rootDir, srcDir, 'pages', pageName);
}

export function getPageStorePath({ rootDir, srcDir, projectType, pageName }) {
  const pageNameDir = getPagePath({ rootDir, srcDir, pageName });
  // e.g: src/pages/${pageName}/store.ts
  const pageStoreFilePath = path.join(pageNameDir, `store.${projectType}`);

  return pageStoreFilePath;
}

export function getPageModelPath({ rootDir, srcDir, projectType, pageName }) {
  const pageNameDir = getPagePath({ rootDir, srcDir, pageName });
  // e.g: src/pages/${pageName}/models/*
  const pageModelsDir = path.join(pageNameDir, 'models');
  // e.g: src/pages/${pageName}/model.ts
  const pageModelFile = path.join(pageNameDir, `model.${projectType}`);

  return { pageNameDir, pageModelsDir, pageModelFile };
}

export function getRaxPagesPath(rootDir) {
  const absoluteAppJSONPath = path.join(rootDir, 'src/app.json');
  const appJSON = fse.readJSONSync(absoluteAppJSONPath);
  const routes = appJSON.routes;
  const pagesPath = routes.map(route => route.source);

  return pagesPath;
}
