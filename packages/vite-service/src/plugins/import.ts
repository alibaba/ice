import type { Plugin } from 'vite';
import { redirectImport } from '@builder/app-helpers';
import * as path from 'path';

export const importPlugin = ({ rootDir }): Plugin => {
  const iceTempPath = path.resolve(rootDir, '.ice/core/runApp');
  return {
    name: 'vite-plugin-import',
    transform: async (code, id) => {
      if (!/\.(?:[jt]sx?|[jt]s?)$/.test(id)) return;

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
