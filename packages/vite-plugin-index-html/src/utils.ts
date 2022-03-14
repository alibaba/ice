import { posix, sep } from 'path';

/**
 * Check if link is absolute url
 * @param url
 */
export const isAbsoluteUrl = (url: string): boolean => {
  return (/^(https?:)?\/\/.+/).test(url);
};

/**
 * Add Trailing slash
 * @param str
 */
export const addTrailingSlash = (str: string): string => {
  return str.substr(-1) === '/' ? str : `${str}/`;
};

/**
 * format win32 path
 * @param pathStr
 * @returns
 */
export const formatPath = (pathStr: string): string => {
  return process.platform === 'win32' ? pathStr.split(sep).join('/') : pathStr;
};

export const getEntryUrl = (entries: string | Record<string, string>) => {
  if (typeof entries === 'string') {
    return entries;
  }

  const theFirstKeyGotten = Object.keys(entries)[0];
  return entries[theFirstKeyGotten];
};

/**
 * Currently single entry is supported.
 * @param entries
 * @returns
 */
export const isSingleEntry = (entries: string | Record<string, string>) => {
  if (
    typeof entries === 'object'
    && Object.keys(entries).length > 1
  ) {
    return false;
  }
  return true;
};

export function getRelativePath(rootDir: string, path: string): string {
  const formatedRootDir = formatPath(rootDir);
  let relativePath = formatPath(path);

  if (relativePath.includes(formatedRootDir)) {
    relativePath = `/${posix.relative(formatedRootDir, relativePath)}`;
  }
  return relativePath;
}
