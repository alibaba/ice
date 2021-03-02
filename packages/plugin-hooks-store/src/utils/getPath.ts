import * as path from 'path';

export function getAppHooksStorePath({ rootDir, srcDir, projectType }) {
  // e.g: src/hooksStore.ts
  const appStoreFilePath = path.join(rootDir, srcDir, `hooksStore.${projectType}`);
  return appStoreFilePath;
}

export function getPageHooksStorePath({ rootDir, srcDir, projectType, pagePath }) {
  pagePath = path.join('pages', pagePath);

  const pageNameDir = path.join(rootDir, srcDir, pagePath);
  // e.g: src/pages/${pageName}/hooksStore.ts
  const pageStoreFilePath = path.join(pageNameDir, `hooksStore.${projectType}`);

  return pageStoreFilePath;
};

export function getAppHooksPath({ rootDir, srcDir }) {
  // e.g: src/hooks/*
  return path.join(rootDir, srcDir, 'hooks');
}


export function getPageHooksPath({ rootDir, srcDir, projectType, pagePath }) {
  pagePath = path.join('pages', pagePath);

  const pageNameDir = path.join(rootDir, srcDir, pagePath);
  // e.g: src/pages/${pageName}/hooks/*
  const pageHooksDir = path.join(pageNameDir, 'hooks');
  // e.g: src/pages/${pageName}/hooks.ts  
  const pageHooksFile = path.join(pageNameDir, `hooks.${projectType}`);

  return { pageNameDir, pageHooksDir, pageHooksFile };
};