import * as path from 'path';

export function generateAppStorePath(rootDir: string, srcDir: string, projectType: string) {
  // e.g: src/store.ts
  const appStoreFilePath = path.join(rootDir, srcDir, `store.${projectType}`);
  return appStoreFilePath;
}

export function generateAppModelsPath(rootDir: string, srcDir: string) {
  // e.g: src/models/*
  return path.join(rootDir, srcDir, 'models');
}

export function generatePageStorePath (rootDir: string, srcDir: string, pageName: string, projectType: string) {
  const pageNameDir = path.join(rootDir, srcDir, 'pages', pageName);
  // e.g: src/pages/${pageName}/store.ts
  const pageStoreFilePath = path.join(pageNameDir, `store.${projectType}`);

  return pageStoreFilePath;
};

export function generatePageModelPath (rootDir: string, srcDir: string, pageName: string, projectType: string) {
  const pageNameDir = path.join(rootDir, srcDir, 'pages', pageName);
  // e.g: src/pages/${pageName}/models/*
  const pageModelsDir = path.join(pageNameDir, 'models');
  // e.g: src/pages/${pageName}/model.ts
  const pageModelFile = path.join(pageNameDir, `model.${projectType}`);

  return { pageNameDir, pageModelsDir, pageModelFile };
};
