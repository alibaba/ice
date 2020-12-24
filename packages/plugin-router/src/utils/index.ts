/**
 * @file utils.
 * @author tony7lee
 */

import * as glob from 'glob';

/**
 * get paths for pages
 *
 * @export
 * @param {string} cwd
 * @returns
 */
export function getPagePaths(cwd: string) {
  return glob.sync('**/*.+(tsx|jsx)', {
    cwd
  });
}

/**
 * get js file paths
 *
 * @export
 * @param {string} filePath
 * @returns
 */
export function getJsFilePathsIn(filePath: string) {
  return glob.sync(`${filePath}.@(ts?(x)|js?(x))`);
}

export function isDynamicPath(str: string) {
  return typeof str === 'string' && /^\$\w+/.test(str);
}

export function transformDynamicPath(str: string) {
  return str.replace(/^\$/, ':');
}

export function isOptionalDynamicPath(str: string) {
  return typeof str === 'string' && /^\$\w+\$$/.test(str);
}

export function transformOptionalDynamicPath(str: string) {
  return transformDynamicPath(str).replace(/\$$/, '?');
}

export function isNestFileName(str: string) {
  return typeof str === 'string' && /^_\w+/.test(str);
}

export function upperCaseFirst(str: string) {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function transformComponentName(str: string) {
  return str.replace(/-/g, '$$$');
}

export function fillTabWith(count: number) {
  return new Array(count).fill('  ').join('');
}

export function formatPathForWin(strPath: string) {
  const isWin = process.platform === 'win32';
  return isWin ? strPath.replace(/\\/g, '/') : strPath;
}

// # estimate types

const obj2Str = Object.prototype.toString;

export function isObject(v) {
  return obj2Str.call(v) === '[object Object]';
}
