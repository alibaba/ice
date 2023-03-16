import moduleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import type { ImportSpecifier } from '@ice/bundles/compiled/es-module-lexer';
import type { UnpluginOptions } from '@ice/bundles/compiled/unplugin/index.js';
import consola from 'consola';
import MagicString from '@ice/bundles/compiled/magic-string/index.js';
import { createFilter } from '@rollup/pluginutils';
import type { Config } from '../types.js';

interface DeclarationData {
  specifier: string | string[];
  source: string;
  type?: boolean;
  alias?: Record<string, string>;
}

interface Options {
  exportData: DeclarationData[];
  targetSource: string;
}

interface PluginOptions {
  exportData: DeclarationData[];
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

export function parseRedirectData(data: DeclarationData[]): RedirectData {
  const redirectData: RedirectData = {};
  data.forEach(({ specifier, alias = {}, type, source }) => {
    const isDefault = typeof specifier === 'string';
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
  function parseLocalIdentifier(identifier: string, alias: Record<string, string>): string {
    return alias[identifier] ? `${alias[identifier]} as ${identifier}` : identifier;
  }
  const importStatements = Object.keys(matchedImports).map((source) => {
    const importStatements = matchedImports[source];
    let defaultImport = '';
    const namedImports = [];
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
    consola.debug('[parse error]', e);
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
      const missMatchedIdentifiers = [];
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
            missMatchedIdentifiers.push(identifier);
          }
        });

        if (Object.keys(matchedImports).length > 0) {
          const transformedImport = generateImport(matchedImports);
          // TODO: Add file name detail.
          consola.debug(`transform ${importStr} to ${transformedImport}`);

          if (missMatchedIdentifiers.length > 0) {
            const replacedImportStr = importStr.replace(ICE_REG_EXP, (str, matchStr) => {
              return str.replace(matchStr, ` ${missMatchedIdentifiers.join(',')} `);
            });
            str().overwrite(targetImport.ss, targetImport.se, `${replacedImportStr};\n${transformedImport}`);
          } else {
            str().overwrite(targetImport.ss, targetImport.se, transformedImport);
          }
        }
      }
    }
  });
  return s ? s.toString() : code;
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
