import type { Plugin } from 'vite';
import { redirectImport } from '@builder/app-helpers';
import * as path from 'path';

interface Option {
  rootDir: string;
  entries: Record<string, string[]>
}

const getData = (rootDir: string, list: string[]) => {
  return list.reduce((acc, key) => {
    acc[key] = path.resolve(rootDir, `.ice/entries/${key}/runApp`);
    return acc;
  }, {});
};

export const importPlugin = ({ rootDir, entries }: Option): Plugin => {
  const entryList = Object.keys(entries);
  const isMpa = entryList.length > 1;
  const mpaData = getData(rootDir, entryList);

  return {
    name: 'vite-plugin-import',
    transform: async (code, id) => {
      if (!/\.(?:[jt]sx?|[jt]s?)$/.test(id)) return;

      const relativePath = path.relative(rootDir, id).toLocaleLowerCase();
      const name = entryList.find(pageName => relativePath.includes(pageName));
      const iceTempPath = isMpa ? mpaData[name] : path.resolve(rootDir, '.ice/core/runApp');

      if (!iceTempPath) return code;

      // 获取相对路径
      const url = path.relative(path.dirname(id), iceTempPath);
      return await redirectImport(code, {
        source: 'ice', redirectImports: [
          {
            name: 'runApp',
            redirectPath: url,
            default: false,
          }
        ]
      });
    }
  };
};
