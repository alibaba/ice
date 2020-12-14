import * as path from 'path';
import * as fs from 'fs-extra';
import getRoutesByAppJson from './getRoutesByAppJson';

interface IOptions {
  target: string;
  appJsonPath: string;
}

interface IEntry {
  entryPath: string;
  entryName: string;
  pageName: string;
  source?: string;
}

// Get entries when exist app.json
export default function (api, options?: IOptions): IEntry[] {
  const { target, appJsonPath } = options || {};
  if (appJsonPath) {
    return getEntriesByJson(api, target, appJsonPath);
  }
  return getEntriesByDir(api);
}

function getEntriesByJson(api, target, appJsonPath): IEntry[] {
  const {
    context: { rootDir },
  } = api;
  const routes = getRoutesByAppJson(target, { appJsonPath });
  return routes.map((route) => {
    let pageName;
    let entryName;
    if (route.name) {
      entryName = route.name;
      pageName = route.name;
    } else {
      const dir = path.dirname(route.source);
      pageName = path.parse(dir).name;
      entryName = pageName.toLocaleLowerCase();
    }
    return {
      entryPath: getPageEntryByAppJson(rootDir, route.source),
      entryName,
      pageName,
      source: route.source
    };
  });
}

function getPageEntryByAppJson(rootDir, source) {
  const absolutePath = path.resolve(rootDir, 'src', source);
  const targetExt = ['ts', 'tsx', 'js', 'jsx'].find(ext => fs.existsSync(`${absolutePath}.${ext}`));
  if (!targetExt) {
    throw new Error(`Cannot find target file ${absolutePath}.`);
  }
  return `${source}.${targetExt}`;
}

function getEntriesByDir(api: any): IEntry[] {
  const {
    context: { rootDir },
  } = api;
  const pagesPath = path.join(rootDir, 'src/pages');
  const pages = fs.existsSync(pagesPath)
    ? fs
      .readdirSync(pagesPath)
      .filter((page) => !/^[._]/.test(page))
      .map((page) => path.parse(page).name)
    : [];

  const entries = pages.map((pageName) => {
    const entryName = pageName.toLocaleLowerCase();
    const pageEntry = getPageEntryByDir(pagesPath, pageName);
    if (!pageEntry) return null;
    return {
      entryName,
      pageName,
      entryPath: `pages/${pageName}/${pageEntry}`,
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
