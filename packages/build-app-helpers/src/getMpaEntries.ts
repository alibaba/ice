import * as path from 'path';
import * as fs from 'fs-extra';
import getRoutesByJson from './getRoutesByJson';

// Get entries when exist app.json
export default function (api, { target, jsonPath }) {
  if (jsonPath) {
    return getEntriesByJson(target, jsonPath);
  }
  return getEntriesByDir(api);
}

function getEntriesByJson(target, jsonPath) {
  const routes = getRoutesByJson(target, jsonPath);
  return routes.map((route) => {
    const dir = path.dirname(route.source);
    const pageName = path.parse(dir).name;
    return {
      path: route.path,
      entryName: pageName.toLowerCase(),
      pageName,
      entryPath: route.source.replace(/\/?pages/, ''),
    };
  });
}

function getEntriesByDir(api: any) {
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
    const pageEntry = getPageEntry(pagesPath, pageName);
    return {
      entryName,
      pageName,
      entryPath: `${pageName}/${pageEntry}`,
    };
  });
  return entries;
}

function getPageEntry(pagesPath: string, pageName: string) {
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
