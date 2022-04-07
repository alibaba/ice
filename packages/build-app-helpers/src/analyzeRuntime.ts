import * as path from 'path';
import * as fs from 'fs-extra';
import * as glob from 'fast-glob';
import { init, parse } from 'es-module-lexer';
import { transform } from 'esbuild';
import type { Loader } from 'esbuild';

type CheckMap = Record<string, boolean>;
type WebpackAlias = Record<string, string>;
type ViteAlias = {find: string | RegExp, replacement: string}[];
interface Options {
  rootDir: string;
  parallel?: number;
  analyzeRelativeImport?: boolean;
  mode?: 'webpack' | 'vite';
  // webpack mode
  alias?: WebpackAlias | ViteAlias;
  customRuntimeRules?: Record<string, string[]>
}

const defaultRuntimeRules = {
  'build-plugin-ice-request': ['request', 'useRequest'],
  'build-plugin-ice-auth': ['useAuth', 'withAuth'],
};

export async function globSourceFiles(sourceDir: string): Promise<string[]> {
  return await glob('**/*.{js,ts,jsx,tsx}', {
    cwd: sourceDir,
    ignore: [
      '**/node_modules/**',
      'src/apis/**',
      '**/__tests__/**',
    ],
    absolute: true,
  });
}

function addLastSlash(filePath: string) {
  return filePath.endsWith('/') ? filePath : `${filePath}/`;
}

function getWebpackAliasedPath(filePath: string, alias: WebpackAlias): string {
  let aliasedPath = filePath;
  // eslint-disable-next-line no-restricted-syntax
  for (const aliasKey of Object.keys(alias || {})) {
    const isStrict = aliasKey.endsWith('$');
    const strictKey = isStrict ? aliasKey.slice(0, -1) : aliasKey;
    const aliasValue = alias[aliasKey];
    
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
        // eslint-disable-next-line no-continue
        continue;
      }
      // case: { xyz: '/some/dir' }
      // import xyz from 'xyz/file.js'; // resolved as /some/dir/file.js
      const slashedKey = addLastSlash(strictKey);
      if (aliasedPath.startsWith(slashedKey)) {
        aliasedPath = aliasedPath.replace(new RegExp(`^${slashedKey}`), addLastSlash(aliasValue));
        break;
      }
    }
  }
  return aliasedPath;
}

function getViteAliasedPath(filePath: string, alias: ViteAlias): string {
  // apply aliases
  let aliasedPath = filePath;
  // eslint-disable-next-line no-restricted-syntax
  for (const { find, replacement } of (alias || [])) {
    const matches =
      typeof find === 'string' ? aliasedPath.startsWith(find) : find.test(aliasedPath);
    if (matches) {
      aliasedPath = aliasedPath.replace(find, replacement);
      break;
    }
  }
  return aliasedPath;
}

export function getImportPath(importSpecifier: string, importer: string, options: Pick<Options, 'alias'|'rootDir'|'mode'>) {
  const { alias, rootDir, mode } = options;
  let aliasedPath = mode === 'webpack'
    ? getWebpackAliasedPath(importSpecifier, alias as WebpackAlias)
    : getViteAliasedPath(importSpecifier, alias as ViteAlias);
  if (!path.isAbsolute(aliasedPath)) {
    try {
      // 检测是否可以在 node_modules 下找到依赖，如果可以直接使用该依赖
      aliasedPath = require.resolve(aliasedPath, { paths: [rootDir]});
    } catch (e) {
      // ignore errors
      aliasedPath = path.resolve(path.dirname(importer), aliasedPath); 
    }
  }
  // filter path with node_modules
  if (aliasedPath.includes('node_modules')) {
    return '';
  } else if (!path.extname(aliasedPath)) {
    // get index file of 
    const basename = path.basename(aliasedPath);
    const patterns = [`${basename}.{js,ts,jsx,tsx}`, `${basename}/index.{js,ts,jsx,tsx}`];
    
    return glob.sync(patterns, {
      cwd: path.dirname(aliasedPath),
      absolute: true,
    })[0];
  }
  return aliasedPath;
}

export default async function analyzeRuntime(files: string[], options: Options): Promise<CheckMap> {
  const { analyzeRelativeImport, rootDir, alias, mode = 'webpack', parallel, customRuntimeRules = {} } = options;
  const parallelNum = parallel ?? 10;
  const sourceFiles = [...files];
  const checkMap: CheckMap = {};
  const analyzedSet = new Set<string>();
  const runtimeRules = { ...defaultRuntimeRules, ...customRuntimeRules };
  // init check map
  const checkPlugins = Object.keys(runtimeRules);
  checkPlugins.forEach((pluginName) => {
    checkMap[pluginName] = false;
  });

  async function analyzeFile(filePath: string) {
    analyzedSet.add(filePath);
    let source = fs.readFileSync(filePath, 'utf-8');
    const lang = path.extname(filePath).slice(1);
    let loader: Loader;
    if (lang === 'ts' || lang === 'tsx' || lang === 'jsx') {
      // if file includes syntax of JSX, it need to be ends with extension .jsx / .tsx
      loader = lang;
    }
    try {
      if (loader) {
        // transform content first since es-module-lexer can't handle ts file
        source = (await transform(source, { loader })).code;
      }
      await init;
      const imports = parse(source)[0];
      await Promise.all(imports.map((importSpecifier) => {
        return (async () => {
          const importName = importSpecifier.n;
          // filter source code
          if (importName === 'ice') {
            const importStr = source.substring(importSpecifier.ss, importSpecifier.se);
            checkPlugins.forEach((pluginName) => {
              const apiList: string[] = runtimeRules[pluginName];
              if (apiList.some((apiName) => importStr.includes(apiName))) {
                checkMap[pluginName] = true;
              }
            });
          } else if (analyzeRelativeImport) {
            let importPath = importName;
            if (!path.isAbsolute(importPath)) {
              importPath = getImportPath(importPath, filePath, { rootDir, alias, mode });
            }
            if (importPath
              && !analyzedSet.has(importPath)
              && fs.existsSync(importPath)
              && importPath.match(/\.(j|t)sx?$/)
            ) {
              await analyzeFile(importPath);
            }
          }
        })();
      }));
    } catch (err) {
      console.log('[WARN]', `optimize runtime failed when analyze ${filePath}`);
      throw err;
    }
  }

  try {
    for (
      let i = 0;
      i * parallelNum < sourceFiles.length && checkPlugins.some((pluginName) => checkMap[pluginName] === false);
      i++) {
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(sourceFiles.slice(i * parallelNum, i * parallelNum + parallelNum).map((filePath) => {
        return analyzeFile(filePath);
      }));
    }
  } catch(err) {
    // 如果发生错误，兜底启用所有自动检测的运行时插件，防止错误地移除
    checkPlugins.forEach((pluginName) => {
      checkMap[pluginName] = true;
    });
    return checkMap;
  }
  
  return checkMap;
}