/**
 * @file amender.
 * @author tony7lee
 */

import * as path from 'path';
import * as glob from 'glob';
import {
  getJsFilePathsIn,
  formatPathForWin,
  transformComponentName,
} from '../utils';
import { ICollectItem } from '../types/collector';

/**
 * loop amend
 *
 * @param {string} payload
 * @param {*} collect
 */
function loopAmend(payload: string, collect: ICollectItem[]) {
  collect.forEach(item => {
    const { routePath, component, children } = item;

    // reduce routePath to the nested
    item.routePathAmend = routePath;

    if (payload && payload !== '/') {
      item.routePathAmend = routePath.replace(payload, '');
    }
    // tansform component name
    item.component = transformComponentName(component);

    if (children) {
      loopAmend(routePath, children);
    }
  });
}

/**
 * add default layout
 * default layout: `src/layouts/index.[jsx|tsx]`
 */
function addDefaultLayout(
  rootDir: string,
  routersTempPath: string,
  collect: ICollectItem[]
) {
  const rootRoute = collect && collect[0];
  // get the js like file
  const layoutJSFilePaths = getJsFilePathsIn(
    path.join(rootDir, 'src/layouts/index')
  );
  const defaultLayoutExists = Boolean(layoutJSFilePaths.length);
  const defaultLayoutPath = layoutJSFilePaths[0] || '';
  const defaultLayoutPathRelative = formatPathForWin(
    path.relative(
      path.dirname(routersTempPath),
      defaultLayoutPath
    )
  );

  if (defaultLayoutExists) {
    // has layout nested such as _layout
    if (rootRoute && rootRoute.routePath === '/') {
      rootRoute.filePath = defaultLayoutPathRelative;
    } else {
      const spliceRoutes = collect.splice(0, collect.length);
      collect.push({
        routePath: '/',
        component: 'Layout',
        filePath: defaultLayoutPathRelative,
        isLayoutLike: true,
        children: spliceRoutes
      });

    }
  }
}

/**
 * add default 404
 * default file: `src/pages/404?[/index].[jsx|tsx]`
 */
function addDefault404(
  rootDir: string,
  routersTempPath: string,
  collect: ICollectItem[]
) {
  const rootRoute = collect && collect[0];
  // get the js like file
  const defaultMatch = path.join(rootDir, 'src/pages/404');
  const extMatch = '.@(ts?(x)|js?(x))';
  const page404JSFilePaths = glob.sync(`${defaultMatch}{/index${extMatch},${extMatch}}`);
  const default404Exists = Boolean(page404JSFilePaths.length);
  const default404Path = page404JSFilePaths[0] || '';
  const default404PathRelative = formatPathForWin(
    path.relative(
      path.dirname(routersTempPath),
      default404Path
    )
  );

  if (default404Exists) {
    const config404 = {
      routePath: '',
      exact: String(false),
      component: 'Page404',
      filePath: default404PathRelative,
      isLayoutLike: false
    };
    if (rootRoute && rootRoute.routePath === '/') {
      // has layout nested such as _layout
      if (!rootRoute.children) rootRoute.children = [];
      rootRoute.children.push(config404);
    } else if (collect) {
      collect.push(config404);
    }
  }
}

export default function amender(
  rootDir: string,
  routersTempPath: string,
  routesCollect: ICollectItem[]
) {
  addDefaultLayout(rootDir, routersTempPath, routesCollect);
  addDefault404(rootDir, routersTempPath, routesCollect);
  loopAmend('', routesCollect);
}