import * as path from 'path';
import * as globby from 'globby';

export declare type ProjectType = 'ts' | 'js';
export declare type Entry = string | string[] | Record<string, string | string[]>;

function getProjectType (entry: Entry, rootDir): ProjectType {
  const entryFiles = [];
  // entry: string | string[] | { [name]: string | string[] }
  if (typeof entry === 'string') {
    entryFiles.push(entry);
  } else if (Array.isArray(entry)) {
    entryFiles.push(...entry);
  } else if(Object.prototype.toString.call(entry) === '[object Object]') {
    const values = Object.values(entry);
    const files = values.reduce((acc, cur) => {
      if (typeof cur === 'string') {
        (acc as string[]).push(cur);
      } else {
        (acc as string[]).push(...cur);
      }
      return acc;
    }, []);
    entryFiles.push(...(files as string[]));
  }

  const entryNameArr = entryFiles.map(filePath => {
    return path.parse(filePath).name;
  }).filter((name, index, arr) => {
    return arr.indexOf(name) === index;
  });

  const tsEntryFiles = entryNameArr.reduce((files, entryName) => {
    files.push(...globby.sync([`src/${entryName}.@(ts?(x))`, `src/pages/*/${entryName}.@(ts?(x))`], { cwd: rootDir }));
    return files;
  }, []);
  return tsEntryFiles.length ? 'ts' : 'js';
}

export {
  getProjectType
};