import * as path from 'path';
import * as fs from 'fs-extra';
import getRoutesByAppJson from './getRoutesByAppJson';
import getEntriesByRoute from './getEntriesByRoute';
import { IEntry } from './types';

interface IOptions {
  target: string;
  appJsonPath?: string;
  appJsonContent?: string;
}

// Get entries when exist app.json
export default function (api, options?: IOptions): IEntry[] {
  const { target, appJsonPath, appJsonContent } = options || {};
  if (appJsonPath || appJsonContent) {
    return getEntriesByJson(api, target, appJsonPath, appJsonContent);
  }
  return getEntriesByDir(api);
}

function getEntriesByJson(api, target, appJsonPath, appJsonContent): IEntry[] {
  const {
    context: { rootDir },
  } = api;
  const routes = getRoutesByAppJson(target, { appJsonPath, appJsonContent });
  return routes.reduce((prev, curr) => {
    return [...prev, ...getEntriesByRoute(curr, rootDir)];
  }, []);
}

function getEntriesByDir(api: any): IEntry[] {
  const {
    context: { rootDir },
  } = api;
  const srcPath = path.join(rootDir, 'src');
  const pagesPath = path.join(srcPath, 'pages');
  const pages = fs.existsSync(pagesPath)
    ? fs
      .readdirSync(pagesPath)
      .filter((page) => !/^[._]/.test(page))
      .map((page) => path.parse(page).name)
    : [];

  const entries = pages.map((pageName) => {
    const entryName = pageName.toLocaleLowerCase();
    const pageEntry = getPageEntryByDir(pagesPath, pageName);
    const source = `pages/${pageName}/${pageEntry}`;
    const entryPath = path.join(srcPath, source);
    if (!pageEntry) return null;
    return {
      entryName,
      pageName,
      entryPath,
      source,
    };
  }).filter(Boolean);
  return entries;
}

function getPageEntryByDir(pagesPath: string, pageName: string) {
  const pagePath = path.join(pagesPath, pageName);
  const pageRootFiles = fs.readdirSync(pagePath);
  const appRegexp = /^app\.(t|j)sx?$/;
  const indexRegexp = /^index\.(t|j)sx?$/;

  return pageRootFiles.find((file) => {
    // eslint-disable-next-line
    return appRegexp.test(file)
      ? 'app'
      : indexRegexp.test(file)
        ? 'index'
        : null;
  });
}
