import type { Plugin } from 'vite';
import { redirectImport, formatPath } from '@builder/app-helpers';
import MagicString from 'magic-string';
import * as path from 'path';
import { isObject } from 'lodash';

interface Option {
  rootDir: string;
  entries?: string | Record<string, string[]>
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

const pluginImportMPA = ({ rootDir, entries }: Option): Plugin => {
  const entryList = Object.keys(entries);
  const mpaRunAppPathsMap = getMpaRunAppPathsMap(rootDir, entryList);
  let needSourcemap = false;
  return {
    name: 'vite-plugin-import-mpa',
    configResolved(resolvedConfig) {
      needSourcemap = !!resolvedConfig.build.sourcemap;
    },
    transform: async (code, id) => {
      if (!/\.(?:[jt]sx?|[jt]s?)$/.test(id)) return;

      const relativePath = path.relative(rootDir, id).toLocaleLowerCase();
      const name = entryList.find(pageName => relativePath.includes(pageName));
      const iceTempPath = mpaRunAppPathsMap[name];

      if (!iceTempPath) return;
      const sourceCode = await getTransformedCode(code, id, iceTempPath);
      return {
        map: needSourcemap ? (new MagicString(sourceCode)).generateMap({ hires: true }) : null,
        code: sourceCode,
      };
    }
  };
};

const pluginImportSPA = ({ rootDir }: Option): Plugin => {
  let needSourcemap = false;
  return {
    name: 'vite-plugin-import-spa',
    configResolved(resolvedConfig) {
      needSourcemap = !!resolvedConfig.build.sourcemap;
    },
    transform: async (code, id) => {
      if (!/\.(?:[jt]sx?|[jt]s?)$/.test(id)) return;

      const sourceCode = await getTransformedCode(code, id, path.resolve(rootDir, '.ice/core/runApp'));
      return {
        map: needSourcemap ? (new MagicString(sourceCode)).generateMap({ hires: true }) : null,
        code: sourceCode,
      };
    }
  };
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
  return isMpa ? pluginImportSPA({ rootDir }) : pluginImportMPA({ rootDir, entries });
};
