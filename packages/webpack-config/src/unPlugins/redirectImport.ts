import moduleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import type { ImportSpecifier } from '@ice/bundles/compiled/es-module-lexer';
import type { UnpluginOptions } from '@ice/bundles/compiled/unplugin/index.js';
import consola from 'consola';
import MagicString from '@ice/bundles/compiled/magic-string/index.js';
import { createFilter } from '@rollup/pluginutils';
import type { ExportData } from '@ice/types/esm/generator.js';
import type { Config } from '@ice/types';

interface Options {
  exportData: ExportData[];
  targetSource: string;
}

interface PluginOptions {
  exportData: ExportData[];
  sourceMap?: Config['sourceMap'];
}

interface RedirectData {
  [x: string]: {
    type: boolean;
    isDefault: boolean;
    source: string;
    alias: Record<string, string>;
  };
}

interface ImportData {
  isDefault: boolean;
  identifier: string;
  alias: Record<string, string>;
}
interface MatchedImports {
  [x: string]: ImportData[];
}

const { init, parse } = moduleLexer;

const AS_ALIAS_REG_EXP = /^(\w+)\s+as\s+(\w+)/;
const ICE_REG_EXP = /import\s?(?:type)?\s?\{([\w*\s{},]*)\}\s+from\s+['"](.*)['"]/;

export function parseRedirectData(data: ExportData[]): RedirectData {
  const redirectData: RedirectData = {};
  data.forEach(({ specifier, exportAlias, type, source }) => {
    const isDefault = typeof specifier === 'string';
    const alias = exportAlias || {};
    (isDefault ? [specifier] : specifier).forEach((str) => {
      redirectData[str] = {
        type,
        isDefault,
        source,
        alias,
      };
    });
  });
  return redirectData;
}

export function generateImport(matchedImports: MatchedImports): string {
  let defaultImport = '';
  let namedImports = [];
  function parseLocalIdentifier(identifier: string, alias: Record<string, string>): string {
    return alias[identifier] ? `${alias[identifier]} as ${identifier}` : identifier;
  }
  const importStatements = Object.keys(matchedImports).map((source) => {
    const importStatements = matchedImports[source];
    importStatements.forEach(({ isDefault, identifier, alias }) => {
      if (isDefault) {
        defaultImport = parseLocalIdentifier(identifier, alias);
      } else {
        namedImports.push(parseLocalIdentifier(identifier, alias));
      }
    });
    if (defaultImport || namedImports.length) {
      const namedImportStr = namedImports.length ? `{ ${namedImports.join(', ')} }` : '';
      const importSpecifier = namedImportStr ? `${defaultImport ? `, ${namedImportStr}` : namedImportStr}` : '';
      return `import ${defaultImport}${importSpecifier} from '${source}'`;
    }
    return '';
  });
  return importStatements.join(';\n');
}

export async function redirectImport(code: string, options: Options): Promise<string> {
  const { exportData, targetSource } = options;
  const redirectData = parseRedirectData(exportData);
  await init;
  let imports: readonly ImportSpecifier[] = [];
  try {
    imports = parse(code)[0];
  } catch (e) {
    consola.error('[parse error]', e);
  }
  if (!imports.length) {
    return code;
  }

  let s: MagicString | undefined;
  const str = () => s || (s = new MagicString(code));
  imports.forEach((targetImport) => {
    if (targetImport.n === targetSource) {
      let importStr = code.substring(targetImport.ss, targetImport.se);
      const matched = importStr.match(ICE_REG_EXP);
      if (matched) {
        let matchedImports: MatchedImports = {};
        const [, identifiers] = matched;
        identifiers.trim().split(',').forEach((str) => {
          let identifier = str.trim();
          let localIdentifier = '';
          const matchedLocalAlias = identifier.match(AS_ALIAS_REG_EXP);
          if (matchedLocalAlias) {
            [, identifier, localIdentifier] = matchedLocalAlias;
          }
          if (redirectData[identifier]) {
            const { isDefault, alias, source } = redirectData[identifier];
            if (!matchedImports[source]) {
              matchedImports[source] = [];
            }
            const redirectAlias = {};
            if (localIdentifier) {
              // add additional alias for as, such as:
              // import { runApp as run } from 'ice';
              redirectAlias[localIdentifier] = alias[identifier] || identifier;
              // replace identifier with aliased string
              identifier = localIdentifier;
            }
            matchedImports[source].push({
              isDefault,
              identifier,
              alias: {
                ...(alias || {}),
                ...redirectAlias,
              },
            });
          } else {
            consola.error('[ERROR]', `can not found redirect data for import statement: \n${importStr}`);
          }
        });
        const transformedImport = generateImport(matchedImports);
        consola.debug(`transform ${importStr} to ${transformedImport}`);
        str().overwrite(targetImport.ss, targetImport.se, transformedImport);
      }
    }
  });
  return s.toString();
}


const redirectImportPlugin = (options: PluginOptions): UnpluginOptions => {
  const { sourceMap, exportData } = options;
  const include = ['**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'];
  const exclude = 'node_modules/**';
  const filter = createFilter(include, exclude);
  return {
    name: 'redirect-import-plugin',
    async transform(code: string, id: string) {
      // only transform source code;
      if (!code || !filter(id)) {
        return null;
      }
      const transformedCode = await redirectImport(code, {
        exportData,
        targetSource: 'ice',
      });

      return {
        code: transformedCode,
        map: sourceMap ? (new MagicString(transformedCode)).generateMap({ hires: true }) : null,
      };
    },
  };
};

export default redirectImportPlugin;
