import * as path from "path";
// @ts-ignore
import * as fse from "fs-extra";
//@ts-ignore
export function getAppHooksStorePath({ rootDir, srcDir, projectType }) {
  // e.g: src/store.ts
  const appStoreFilePath = path.join(
    rootDir,
    srcDir,
    `hooksStore.${projectType}`
  );
  return appStoreFilePath;
}
//@ts-ignore
export function getAppHooksPath({ rootDir, srcDir }) {
  // e.g: src/models/*
  return path.join(rootDir, srcDir, "hooks");
}
