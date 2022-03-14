import * as path from 'path';
import fs from 'fs-extra';
import fg from 'fast-glob';
import { init, parse } from 'es-module-lexer';
import { transform } from 'esbuild';
import type { Loader } from 'esbuild';
import consola from 'consola';

interface Options {
  parallel?: number;
  alias?: Alias;
}

export interface Alias {
  [x: string]: string | false;
}

function addLastSlash(filePath: string) {
  return filePath.endsWith('/') ? filePath : `${filePath}/`;
}

export function resolveId(id: string, alias: Alias) {
  let aliasedPath = id;
  for (const aliasKey of Object.keys(alias)) {
    const isStrict = aliasKey.endsWith('$');
    const strictKey = isStrict ? aliasKey.slice(0, -1) : aliasKey;
    const aliasValue = alias[aliasKey];
    if (!aliasValue) return false;
    if (aliasValue.match(/.(j|t)s(x)?$/)) {
      if (aliasedPath === strictKey) {
        aliasedPath = aliasValue;
        break;
      }
    } else {
      // case: { xyz: '/some/dir' }, { xyz$: '/some/dir' }
      // import xyz from 'xyz';   // resolved as '/some/dir'
      if (aliasedPath === strictKey) {
        aliasedPath = aliasValue;
        break;
      } else if (isStrict) {
        // case: { xyz$: '/some/dir' }
        // import xyz from 'xyz/file.js'; // resolved as /abc/node_modules/xyz/file.js
        continue;
      }
      const slashedKey = addLastSlash(strictKey);
      if (aliasedPath.startsWith(slashedKey)) {
        aliasedPath = aliasedPath.replace(new RegExp(`^${slashedKey}`), addLastSlash(aliasValue));
        break;
      }
    }
  }
  return aliasedPath;
}

export function getImportPath(
  id: string,
  importer: string,
  alias: Alias,
) {
  let aliasedPath = resolveId(id, alias) || '';
  if (!path.isAbsolute(aliasedPath)) {
    if (aliasedPath.startsWith('.')) {
      aliasedPath = path.resolve(path.dirname(importer), aliasedPath);
    } else {
      // node_modules dependencies
      aliasedPath = '';
    }
  }
  if (aliasedPath && !path.extname(aliasedPath)) {
    const basename = path.basename(aliasedPath);
    const patterns = [`${basename}.{js,ts,jsx,tsx}`, `${basename}/index.{js,ts,jsx,tsx}`];

    return fg.sync(patterns, {
      cwd: path.dirname(aliasedPath),
      absolute: true,
    })[0];
  }
  return aliasedPath;
}

export async function analyzeImports(files: string[], options: Options) {
  const { parallel, alias = {} } = options;
  const parallelNum = parallel ?? 10;
  const entries = [...files];
  const analyzedSet = new Set<string>();
  const importSet = new Set<string>();
  async function analyzeFile(filePath: string) {
    analyzedSet.add(filePath);
    let source = fs.readFileSync(filePath, 'utf-8');
    const lang = path.extname(filePath).slice(1);
    let loader: Loader;
    if (lang === 'ts' || lang === 'tsx') {
      loader = lang;
    }
    try {
      if (loader) {
        // transform content first since es-module-lexer can't handle ts file
        source = (await transform(source, { loader })).code;
      }
      await init;
      const imports = parse(source)[0];
      await Promise.all(imports.map(async (importSpecifier) => {
        return (async () => {
          const importName = importSpecifier.n;
          // filter source code
          if (importName === 'ice') {
            const importStr = source.substring(importSpecifier.ss, importSpecifier.se);
            const regexpForIce = /import\s?(?:type)?\s?\{([\w*\s{},]*)\}\s+from\s+['"]ice['"]/;
            const matched = importStr.match(regexpForIce);
            if (matched) {
              const [,specifierStr] = matched;
              specifierStr.trim().split(',').forEach((importStr) => {
                if (!importSet.has(importStr)) importSet.add(importStr);
              });
            }
          } else {
            let importPath = importName;
            if (!path.isAbsolute(importPath)) {
              importPath = getImportPath(importPath, filePath, alias);
            }
            if (importPath && fs.existsSync(importPath) && !analyzedSet.has(importPath)) {
              await analyzeFile(importPath);
            }
          }
        })();
      }));
    } catch (err) {
      consola.error('[ERROR]', `optimize runtime failed when analyze ${filePath}`);
      consola.debug(err);
      throw err;
    }
  }

  try {
    for (
      let i = 0;
      i * parallelNum < entries.length;
      i++) {
      await Promise.all(entries.slice(i * parallelNum, i * parallelNum + parallelNum).map(async (filePath) => {
        return analyzeFile(filePath);
      }));
    }
    return importSet;
  } catch (err) {
    consola.debug(err);
    return false;
  }
}