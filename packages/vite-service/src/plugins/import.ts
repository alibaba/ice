import type { Plugin } from 'vite';
import { redirectImport, formatPath } from '@builder/app-helpers';
import * as path from 'path';
import { isObject } from 'lodash';

interface Option {
  rootDir: string;
  entries: string | Record<string, string[]>
}

const getMpaRunAppPathsMap = (rootDir: string, list: string[]) => {
  return list.reduce((acc, key) => {
    acc[key] = path.resolve(rootDir, `.ice/entries/${key}/runApp`);
    return acc;
  }, {});
};

const getTransformedCode = async (code: string, id: string, tempPath: string) => {
  const url = formatPath(path.relative(path.dirname(id), tempPath));

  return await redirectImport(code, {
    source: 'ice', redirectImports: [
      {
        name: 'runApp',
        redirectPath: url,
        default: false,
      },
      {
        name: 'createStore',
        redirectPath: '@ice/store',
        default: false,
      }
    ]
  });
};

/**
 * @from import { runApp } from 'ice'
 * @to import { runApp } from '../.ice/core/runApp'
 * 
 * @tip both support spa and mpa
 * @variable runApp icestore
 */
export const importPlugin = ({ rootDir, entries }: Option): Plugin => {
  const isMpa = isObject(entries);

  if (isMpa) {
    const entryList = Object.keys(entries);
    const mpaRunAppPathsMap = getMpaRunAppPathsMap(rootDir, entryList);
    return {
      name: 'vite-plugin-import-mpa',
      transform: async (code, id) => {
        if (!/\.(?:[jt]sx?|[jt]s?)$/.test(id)) return;

        const relativePath = path.relative(rootDir, id).toLocaleLowerCase();
        const name = entryList.find(pageName => relativePath.includes(pageName));
        const iceTempPath = mpaRunAppPathsMap[name];

        if (!iceTempPath) return code;

        return await getTransformedCode(code, id, iceTempPath);
      }
    };
  }

  return {
    name: 'vite-plugin-import-spa',
    transform: async (code, id) => {
      if (!/\.(?:[jt]sx?|[jt]s?)$/.test(id)) return;

      return await getTransformedCode(code, id, path.resolve(rootDir, '.ice/core/runApp'));
    }
  };
};
