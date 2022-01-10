import type { Plugin } from 'vite';
import { redirectImport, formatPath } from '@builder/app-helpers';
import MagicString from 'magic-string';
import { createFilter } from '@rollup/pluginutils';

interface SourceData {
  filename: string;
  value: string;
  type?: 'normal' | 'default';
}

export interface ImportDeclarations {
  name: string;
  value: string;
  type?: 'normal' | 'default';
  alias?: string;
  multipleSource?: SourceData[];
}

interface Option {
  source: string;
  redirectImports: ImportDeclarations[];
}

export const importPlugin = ({ source, redirectImports }: Option): Plugin => {
  const include = ['**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'];
  const exclude = 'node_modules/**';
  const filter = createFilter(include, exclude);
  let needSourcemap = false;

  return {
    name: 'plugin-import-redirect',
    configResolved(resolvedConfig) {
      needSourcemap = !!resolvedConfig.build.sourcemap;
    },
    enforce: 'post',
    transform: async (code, id) => {
      if (!code || !filter(id)) {
        return null;
      }
      const redirectCode = await redirectImport(code, { source, redirectImports: redirectImports.map((redirect) => {
        const { name, value, type, alias, multipleSource = [] } = redirect;
        const matchedSource = multipleSource.find(({ filename }) => formatPath(filename) === formatPath(id));
        return {
          name,
          alias,
          redirectPath: matchedSource ? matchedSource.value : value,
          default: (matchedSource ? matchedSource.type : type) === 'default',
        };
      })});
      return {
        map: needSourcemap ? (new MagicString(redirectCode)).generateMap({ hires: true }) : null,
        code: redirectCode,
      };
    },
  };
};
