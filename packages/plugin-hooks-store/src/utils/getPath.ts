import * as path from 'path';
import { ProjectType } from './types';

export function getAppHooksStorePath({ rootDir, srcDir, projectType }: { rootDir: string; srcDir: string; projectType: ProjectType }) {
  // e.g: src/hooksStore.ts
  const appStoreFilePath = path.join(rootDir, srcDir, `hooksStore.${projectType}`);

  return appStoreFilePath;
}

export function getPageHookStorePath({
  rootDir,
  srcDir,
  projectType,
  pagePath,
}: {
  rootDir: string;
  srcDir: string;
  projectType: ProjectType;
  pagePath: string;
}) {
  pagePath = path.join('pages', pagePath);

  const pageNameDir = path.join(rootDir, srcDir, pagePath);
  // e.g: src/pages/${pageName}/hooksStore.ts
  const pageStoreFilePath = path.join(pageNameDir, `hooksStore.${projectType}`);

  return pageStoreFilePath;
}

export function getAppHooksPath({ rootDir, srcDir }: { rootDir: string; srcDir: string }) {
  // e.g: src/hooks/*
  return path.join(rootDir, srcDir, 'hooks');
}

export function getPageHookPath({
  rootDir,
  srcDir,
  projectType,
  pagePath,
}: {
  rootDir: string;
  srcDir: string;
  projectType: ProjectType;
  pagePath: string;
}) {
  pagePath = path.join('pages', pagePath);

  const pageNameDir = path.join(rootDir, srcDir, pagePath);
  // e.g: src/pages/${pageName}/hooks/*
  const pageHooksDir = path.join(pageNameDir, 'hooks');
  // e.g: src/pages/${pageName}/hooks.ts
  const pageHooksFile = path.join(pageNameDir, `hooksStore.${projectType}`);

  return { pageNameDir, pageHooksDir, pageHooksFile };
}
