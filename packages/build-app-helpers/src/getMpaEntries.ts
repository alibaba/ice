import * as path from 'path';
import * as fs from 'fs-extra';
import getRoutesByAppJson from './getRoutesByAppJson';

interface IOptions {
  target: string;
  appJsonPath?: string;
  appJsonContent?: string;
}

interface IEntry {
  entryPath: string;
  entryName: string;
  pageName: string;
  source?: string;
  path?: string;
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
      // routes.pageSource is absolute path, passed from the plugin-store
      entryPath: route.pageSource || getPageEntryByAppJson(rootDir, route.source),
      entryName,
      pageName,
      source: route.source,
      path: route.path
    };
  });
}

function getPageEntryByAppJson(rootDir, source) {
  const absolutePath = path.resolve(rootDir, 'src', source);
  const targetExt = ['ts', 'tsx', 'js', 'jsx'].find(ext => fs.existsSync(`${absolutePath}.${ext}`));
  if (!targetExt) {
    throw new Error(`Cannot find target file ${absolutePath}.`);
  }
  return `${absolutePath}.${targetExt}`;
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

  // eslint-disable-next-line
  for (const file of pageRootFiles) {
    if (appRegexp.test(file)) {
      return 'app';
    } else if (indexRegexp.test(file)) {
      return 'index';
    }
  }

  return null;
}
