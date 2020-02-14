/**
 * @file splicer.
 * @author tony7lee
 */

import { fillTabWith } from '../utils';
import { ICollectItem } from '../types';

interface IPlayload {
  nestImports: string[];
  nestImportsNames: string[];
  nestSlice: string[];
  indent: number;
}

/**
 * loop splice
 *
 * @param {*} payload
 * @param {*} collect
 */
function loopSplice(payload: IPlayload, collect: ICollectItem[]) {
  const indent = payload.indent;
  const indentTabs = fillTabWith(indent);
  const indentTabsSub1 = fillTabWith(indent - 1);

  // add 2 space per loop
  payload.indent += 2;

  // nest the array stucture
  payload.nestSlice.push(`[`);
  // run loop
  collect.forEach(item => {
    const {
      routePathAmend,
      component,
      filePath,
      children,
      isLayoutLike,
      exact
    } = item;
    // collect imports
    if (!payload.nestImportsNames.includes(component)) {
      payload.nestImports.push(`import ${component} from '${filePath}';\n`);
      // record component exists
      payload.nestImportsNames.push(component);
    }
    // nest object structure
    const defaultExact = exact || 'true';
    payload.nestSlice.push(`
${indentTabs}{
  ${indentTabs}path: '${routePathAmend}',
  ${indentTabs}exact: ${isLayoutLike ? 'false' : defaultExact},
  ${indentTabs}component: ${component}`);
    if (children && children.length) {
      payload.nestSlice.push(`,
  ${indentTabs}children: `);
      // loop children
      loopSplice(payload, children);
      // children field end
      payload.nestSlice.push(`,`);
    }
    // nest object end
    payload.nestSlice.push(`
${indentTabs}},`)

  });
  // nest the array end
  payload.nestSlice.push(`\n${indentTabsSub1}]`);
}

export default function splicer(routesCollect: ICollectItem[]) {
  // loop data
  const payload: IPlayload = { nestImports: [], nestImportsNames: [], nestSlice: [], indent: 1 };
  // init loop
  loopSplice(payload, routesCollect);
  return `${payload.nestImports.join('')}\nexport default ${payload.nestSlice.join('')};`
}
