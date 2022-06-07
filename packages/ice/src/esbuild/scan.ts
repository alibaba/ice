import * as path from 'path';
import type { Plugin } from 'esbuild';
import fg from 'fast-glob';
import { resolveId } from '../service/analyze.js';
import { ASSET_TYPES } from './assets.js';

interface Options {
  alias: Record<string, string | false>;
  deps: Record<string, string>;
  exclude: string[];
}

/**
 * esbuild plugin for analyze import of source code
 */
const scanPlugin = (options: Options): Plugin => {
  // deps for record scanned imports
  const { deps, exclude, alias } = options;
  const dataUrlRE = /^\s*data:/i;
  const httpUrlRE = /^(https?:)?\/\//;
  const cache = new Map<string, string | false>();
  const resolve = (id: string, importer: string) => {
    const cacheKey = `${id}${importer && path.dirname(importer)}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    let resolved = resolveId(id, alias);
    // get absolute path for aliased source file
    if (resolved && resolved !== id && !path.extname(resolved) && path.isAbsolute(resolved)) {
      const basename = path.basename(resolved);
      const patterns = [`${basename}.{js,ts,jsx,tsx,mts,mjs}`, `${basename}/index.{js,ts,jsx,tsx,mts,mjs}`];
      resolved = fg.sync(patterns, {
        cwd: path.dirname(resolved),
        absolute: true,
      })[0];
    }
    cache.set(cacheKey, resolved);
    return resolved;
  };

  return {
    name: 'esbuild-scan',
    setup(build) {
      // external urls
      build.onResolve({ filter: httpUrlRE }, ({ path }) => ({
        path,
        external: true,
      }));

      // data urls
      build.onResolve({ filter: dataUrlRE }, ({ path }) => ({
        path,
        external: true,
      }));

      // css & json
      build.onResolve(
        {
          filter: /\.(css|less|sass|scss|styl|stylus|pcss|postcss|json)$/,
        }, ({ path }) => ({
          path,
          external: true,
        }),
      );

      build.onResolve(
        {
          filter: new RegExp(`\\.(${ASSET_TYPES.join('|')})$`),
        }, ({ path }) => ({
          path,
          external: true,
        }),
      );

      build.onResolve({ filter: /.*/ }, async ({ path: id, importer }) => {
        if (
          // match exclude
          exclude?.some((dep) => dep === id || id.startsWith(`${dep}/`)) ||
          // already recorded
          deps[id]
        ) {
          return {
            path: id,
            external: true,
          };
        }
        const resolved = resolve(id, importer);
        if (resolved) {
          // aliased dependencies
          if (!path.isAbsolute(resolved) && !id.startsWith('.')) {
            deps[id] = resolved;
            return {
              path: resolved,
              external: true,
            };
          } else if (path.isAbsolute(resolved)) {
            // return absolute path of aliased path
            return {
              path: resolved,
            };
          }
        } else if (resolved === false) {
          // alias set to be false
          return {
            path: id,
            namespace: 'EMPTY',
          };
        }
      });

      build.onLoad({ filter: /.*/, namespace: 'EMPTY' }, () => ({ contents: '' }));
    },
  };
};

export default scanPlugin;