import * as path from 'path';

/**
 * Check if a package exist in current node_module directory.
 * @param pkgName
 * @param rootDir
 * @returns A tuple
 */
export const findPkgInCurrentDir = (pkgName: string, rootDir: string): [boolean, string] => {
  try {
    const packagePath = require.resolve(`${pkgName}/package.json`, { paths: [rootDir] });
    return [true, path.dirname(packagePath)];
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      return [false, ''];
    } else {
      throw e;
    }
  }
};
