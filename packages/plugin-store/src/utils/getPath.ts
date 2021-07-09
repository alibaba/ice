import * as path from 'path';
import { getStoreFileType, getModelFileType } from './getFileType';

export function getAppStorePath(srcPath: string) {
  const storeFileType = getStoreFileType(srcPath);
  // e.g: src/store.ts
  return path.join(srcPath, `store${storeFileType}`);
}

/**
 * return absolute page path. e.g.: /project/src/pages/Home
 */
export function getPagePath(srcPath: string, pageName: string) {
  return path.join(srcPath, 'pages', pageName);
}

export function getPageStorePath(srcPath: string, pageName: string) {
  const pageNameDir = getPagePath(srcPath, pageName);
  const storeFileType = getStoreFileType(pageNameDir);
  // e.g: src/pages/Home/store.ts
  return path.join(pageNameDir, `store${storeFileType}`);
}

export function getPageModelPath(srcPath: string, pageName: string) {
  const pageNameDir = getPagePath(srcPath, pageName);
  const modelFileType = getModelFileType(pageNameDir);
  // e.g: src/pages/${pageName}/models/*
  const pageModelsDir = path.join(pageNameDir, 'models');
  // e.g: src/pages/${pageName}/model.ts
  const pageModelFile = path.join(pageNameDir, `model${modelFileType}`);

  return { pageNameDir, pageModelsDir, pageModelFile };
}
