import * as path from 'path';
import * as fse from 'fs-extra';

const fileTypes = ['.js', '.ts'];
const jsxFileTypes = ['.jsx', '.tsx'];

/**
 * return the store file type: '.js' | '.ts' | ''
 */
export function getStoreFileType(dirPath: string) {
  return fileTypes.find((fileType) => fse.pathExistsSync(path.join(dirPath, `store${fileType}`))) || '';
}

/**
 * return the route file type: '.js' | '.ts' | ''
 */
export function getRouteFileType(dirPath: string) {
  return [...fileTypes, ...jsxFileTypes].find((fileType) => fse.pathExistsSync(path.join(dirPath, `routes${fileType}`))) || '';
}
