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

export function getPageStorePath({ rootDir, srcDir, projectType, pagePath }) {
  pagePath = path.join('pages', pagePath);

  const pageNameDir = path.join(rootDir, srcDir, pagePath);
  // e.g: src/pages/${pageName}/store.ts
  const pageStoreFilePath = path.join(pageNameDir, `store.${projectType}`);

  return pageStoreFilePath;
}

export function getPageModelPath({ rootDir, srcDir, projectType, pagePath }) {
  pagePath = path.join('pages', pagePath);

  const pageNameDir = path.join(rootDir, srcDir, pagePath);
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
