/**
 * @file walker.
 * @author tony7lee
 */

import * as path from 'path';
import * as fse from 'fs-extra';
import { IIgore, IgnoreOptions, IgnoreType } from '../types/collector';
import {
  getPagePaths,
  upperCaseFirst,
  isDynamicPath,
  transformDynamicPath,
  isOptionalDynamicPath,
  transformOptionalDynamicPath,
  isNestFileName,
  formatPathForWin,
} from '../utils';
import nest from './nest';
import splicer from './splicer';
import amender from './amender';


function ignorePath(checkPath: string, ignoreOptions: IgnoreOptions) {
  if (!ignoreOptions) return false;
  const ignoreList = Array.isArray(ignoreOptions) ? ignoreOptions : [ignoreOptions];
  const result = ignoreList.some((ignore: IgnoreType) => {
    if (typeof ignore === 'string' && checkPath.includes(ignore)) {
      return true;
    } else if ((ignore as IIgore).pattern) {
      const { pattern, attributes } = ignore as IIgore;
      return new RegExp(pattern, attributes || '').test(checkPath);
    }
    return false;
  });
  return result;
}

export default function walker({
  rootDir,
  routerOptions,
  routesTempPath,
  pagesDir,
}) {
  const { ignoreRoutes, ignorePaths = ['components'], caseSensitive } = routerOptions;
  const pageFilePaths = getPagePaths(pagesDir);
  let routesCollect = [];
  const routesMap = {};
  const layoutMap = {};
  pageFilePaths.forEach(pageFilePath => {
    // ignore files
    const hitIgnoreFilePath = ignorePath(pageFilePath, ignorePaths);
    if (hitIgnoreFilePath) return;

    const { dir, name } = path.parse(pageFilePath);
    const dirArr = dir.split('/');

    // estimate _ layout syntax
    const isLayoutLike = isNestFileName(name);
    // omit path from index.jsx/tsx
    const useMainFile = name === 'index';
    if (!useMainFile && !isLayoutLike) dirArr.push(name);

    const dirArrFormatSensitive = dirArr.filter(s => s);
    const dirArrFormat = dirArrFormatSensitive.map(s => s.toLowerCase());
    const dirArrUpper = dirArrFormat.map(s => upperCaseFirst(s)).join('');
    // handle $ syntax: dynamic path
    const dirArrHandleDynamic = (caseSensitive ? dirArrFormatSensitive : dirArrFormat).map(i => {
      let out = i;
      // handle dynamic path
      if (isOptionalDynamicPath(i)) {
        out = transformOptionalDynamicPath(i);
      }
      else if (isDynamicPath(i)) {
        out = transformDynamicPath(i);
      }
      return out;
    });
    // get router path
    const routePath = `/${dirArrHandleDynamic.join('/')}`;

    // get other names
    const compName = `Page${dirArrUpper}`;
    const layoutName = `Layout${dirArrUpper}`;
    const filePath = formatPathForWin(
      path.relative(
        path.dirname(routesTempPath),
        path.join(pagesDir, pageFilePath)
      )
    );

    // ignore by user options.
    const ignoreKey = ignorePath(routePath, ignoreRoutes);
    // use shorter path one when same route occurred.
    const isLongerPath = routesMap[routePath] && useMainFile;
    // ignore and back to loop
    if (isLongerPath || ignoreKey) return;

    // collect pages and layout
    let pageConfig = {
      routePath,
      component: compName,
      filePath,
      isLayoutLike: false
    };
    if (isLayoutLike) {
      pageConfig = {
        ...pageConfig,
        component: layoutName,
        isLayoutLike
      };
      layoutMap[routePath] = pageConfig;
    } else {
      routesMap[routePath] = pageConfig;
    }
    routesCollect = nest(layoutMap, pageConfig, routesCollect);
  });

  // amend collects
  amender(rootDir, routesTempPath, routesCollect);
  // generate splices
  let routesSplices = splicer(routesCollect, routerOptions);
  // output into .tmp
  fse.outputFileSync(routesTempPath, routesSplices);
  routesSplices = null;
}
