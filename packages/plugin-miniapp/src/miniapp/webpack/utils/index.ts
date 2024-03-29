import { networkInterfaces } from 'os';
import path from 'path';
import fs from 'fs-extra';
import { SCRIPT_EXT } from '../../../constant.js';

export const emptyObj = {};
export const emptyTogglableObj = {
  enable: false,
  config: {},
};

export const getRootPath = function () {
  return path.resolve(__dirname, '../../');
};

export const addLeadingSlash = (url = '') => (url.charAt(0) === '/' ? url : `/${url}`);
export const addTrailingSlash = (url = '') => (url.charAt(url.length - 1) === '/' ? url : `${url}/`);
export const hasBasename = (path = '', prefix = '') => new RegExp(`^${prefix}(\\/|\\?|#|$)`, 'i').test(path) || path === prefix;
export const stripBasename = (path = '', prefix = '') => (hasBasename(path, prefix) ? path.substr(prefix.length) : path);
export const stripTrailingSlash = (path = '') => (path.charAt(path.length - 1) === '/' ? path.substring(0, path.length - 1) : path);
export const addHtmlSuffix = (path = '') => `${path}.html`;

export const formatOpenHost = host => {
  let result = host;
  // 配置host为0.0.0.0时,可以转换为ip打开, 其他以配置host默认打开
  if (!result || result === '0.0.0.0' || result.startsWith('local-ip')) {
    // 设置localhost为初值, 防止没正确获取到host时以0.0.0.0打开
    result = 'localhost';
    const interfaces = networkInterfaces();
    for (const devName in interfaces) {
      const isEnd = interfaces[devName]?.some(item => {
        // 取IPv4, 不为127.0.0.1的内网ip
        if (item.family === 'IPv4' && item.address !== '127.0.0.1' && !item.internal) {
          result = item.address;
          return true;
        }
        return false;
      });
      // 若获取到ip, 结束遍历
      if (isEnd) {
        break;
      }
    }
  }
  return result;
};

export function normalizePath(fpath: string) {
  return fpath.replace(/\\/g, '/').replace(/\/{2,}/g, '/');
}

export function promoteRelativePath(fPath: string): string {
  const fPathArr = fPath.split(path.sep);
  let dotCount = 0;
  fPathArr.forEach(item => {
    if (item.indexOf('..') >= 0) {
      dotCount++;
    }
  });
  if (dotCount === 1) {
    fPathArr.splice(0, 1, '.');
    return fPathArr.join('/');
  }
  if (dotCount > 1) {
    fPathArr.splice(0, 1);
    return fPathArr.join('/');
  }
  return normalizePath(fPath);
}

export function resolveMainFilePath(p: string, extArrs = SCRIPT_EXT): string {
  const realPath = p;
  for (let i = 0; i < extArrs.length; i++) {
    const item = extArrs[i];
    if (fs.existsSync(`${p}${item}`)) {
      return `${p}${item}`;
    }
    if (fs.existsSync(`${p}${path.sep}index${item}`)) {
      return `${p}${path.sep}index${item}`;
    }
  }
  return realPath;
}
