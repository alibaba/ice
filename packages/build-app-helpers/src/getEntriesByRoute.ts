import * as path from 'path';
import * as fs from 'fs-extra';
import { IEntry, IRoute } from './types';

export default (
  route: IRoute,
  rootDir: string
) => {
  const entries:IEntry[] = [];
  const { name, source, tabHeader, frames } = route;
  if (name || source) {
    entries.push(getEntry(route, rootDir));
  } else {
    if (frames) {
      frames.forEach(frame => {
        entries.push(getEntry(frame, rootDir));
      });
    }

    if (tabHeader) {
      entries.push(getEntry(tabHeader, rootDir));
    }
  }
  if (entries.length === 0) {
    throw new Error('There is invalid info to get entry name. Please check if there is a name or source field.');
  }
  return entries;
};

function getEntry(route: IRoute, rootDir) {
  const { source, name, pageSource } = route;
  let entryName: string;
  if (name) {
    entryName = name;
  } else {
    const dir = path.dirname(source);
    entryName = path.parse(dir).name.toLocaleLowerCase();
  }

  return {
    ...route,
    entryName,
    entryPath: pageSource || getEntryPath(rootDir, source),
  };
}

function getEntryPath(rootDir, source) {
  const absolutePath = path.resolve(rootDir, 'src', source);
  const targetExt = ['ts', 'tsx', 'js', 'jsx'].find(ext => fs.existsSync(`${absolutePath}.${ext}`));
  if (!targetExt) {
    throw new Error(`Cannot find target file ${absolutePath}.`);
  }
  return `${absolutePath}.${targetExt}`;
}
