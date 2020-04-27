/**
 * @file nest.
 * @author tony7lee
 */
import { ICollectItem } from '../types/collector';

/**
 * recursive nest loop for layout page
 *
 * @param {*} target
 * @param {*} collect
 * @returns
 */
function nestLoop(target: ICollectItem, collect: ICollectItem[]) {
  const {
    routePath
  } = target;
  const out = [];
  const targetChildren = [];
  let targetHandled = false;
  collect.forEach(i => {
    if (routePath === i.routePath) {
      targetHandled = true;
      out.push({ ...i, ...target });
    }
    else if (routePath.indexOf(i.routePath) === 0) {
      targetHandled = true;
      if (i.children && i.children.filter(j => (routePath.indexOf(j.routePath) === 0)).length) {
        i.children = nestLoop(target, i.children);
      } else {
        if (!i.children) i.children = [];
        i.children.push(target);
      }
      out.push(i);
    } else if (i.routePath.indexOf(routePath) === 0) {
      targetHandled = true;
      targetChildren.push(i);
    } else {
      out.push(i);
    }
  });
  // add children to parent target
  if (targetChildren.length) target.children = targetChildren;
  if (!targetHandled) {
    out.push(target);
  }
  return out;
}

/**
 * push page into closest layout
 *
 * @param {string} closestLayoutPath
 * @param {*} target
 * @param {*} collect
 */
function pushClosestNode(closestLayoutPath: string, target: ICollectItem, collect: ICollectItem[]) {
  collect.forEach(i => {
    if (i.routePath === closestLayoutPath) {
      if (!i.children) i.children = [];
      i.children.push(target);
    } else if (i.children && i.children.length) {
      pushClosestNode(closestLayoutPath, target, i.children);
    }
  });
}

export default function nest(layoutMap: object, pageConfig: ICollectItem, routesCollect: ICollectItem[]) {
  let out;
  const layoutKeys = Object.keys(layoutMap);
  const {
    routePath,
    isLayoutLike
  } = pageConfig;
  // push layout
  if (isLayoutLike) {
    out = nestLoop(pageConfig, routesCollect);
  }
  else {
    // search closest layout path
    let closer = 0;
    let closestLayoutPath;
    layoutKeys.forEach(layoutPath => {
      const layoutSectionCount = layoutPath.split('/').length;
      if (routePath.indexOf(layoutPath) === 0 && layoutSectionCount > closer) {
        closer = layoutSectionCount;
        closestLayoutPath = layoutPath;
      }
    });
    // push page into closest layout
    if (closestLayoutPath) {
      pushClosestNode(closestLayoutPath, pageConfig, routesCollect);
    }
    // push page into root
    else {
      routesCollect.push(pageConfig);
    }
    out = routesCollect;
  }
  return out;
}