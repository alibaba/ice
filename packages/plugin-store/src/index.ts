import * as path from 'path';
import { fileURLToPath } from 'url';
import type { Config, Plugin } from '@ice/types';
import micromatch from 'micromatch';
import fg from 'fast-glob';
import { PAGE_STORE_MODULE, PAGE_STORE_PROVIDER, PAGE_STORE_INITIAL_STATES } from './constants.js';

interface Options {
  disableResetPageState?: boolean;
}
const storeFilePattern = '**/store.{js,ts}';
const ignoreStoreFilePatterns = ['**/models/**', storeFilePattern];

const plugin: Plugin<Options> = (options) => ({
  name: '@ice/plugin-store',
  setup: ({ onGetConfig, modifyUserConfig, context: { rootDir, userConfig } }) => {
    const { disableResetPageState = false } = options || {};
    const srcDir = path.join(rootDir, 'src');
    const pageDir = path.join(srcDir, 'pages');

    modifyUserConfig('routes', {
      ...(userConfig.routes || {}),
      ignoreFiles: [...(userConfig?.routes?.ignoreFiles || []), ...ignoreStoreFilePatterns],
    });

    onGetConfig(config => {
      // Add app store provider.
      const appStorePath = getAppStorePath(srcDir);
      if (appStorePath) {
        config.alias = {
          ...config.alias || {},
          $store: appStorePath,
        };
      }
      config.transformPlugins = [
        ...(config.transformPlugins || []),
        exportStoreProviderPlugin({ pageDir, disableResetPageState }),
      ];
      return config;
    });
  },
  runtime: path.join(path.dirname(fileURLToPath(import.meta.url)), 'runtime.js'),
});

function exportStoreProviderPlugin({ pageDir, disableResetPageState }: { pageDir: string; disableResetPageState: boolean }): Config['transformPlugins'][0] {
  return {
    name: 'export-store-provider',
    enforce: 'post',
    transformInclude: (id) => {
      return id.startsWith(pageDir) && !micromatch.isMatch(id, ignoreStoreFilePatterns);
    },
    transform: async (source, id) => {
      const pageStorePath = getPageStorePath(id);
      if (pageStorePath) {
        if (
          isLayout(id) || // Current id is layout.
          !isLayoutExisted(id) // If current id is route and there is no layout in the current dir.
        ) {
          return exportPageStore(source, disableResetPageState);
        }
      }
      return source;
    },
  };
}

function exportPageStore(source: string, disableResetPageState: boolean) {
  const importStoreStatement = `import ${PAGE_STORE_MODULE} from './store';\n`;
  const exportStoreProviderStatement = disableResetPageState ? `
const { Provider: ${PAGE_STORE_PROVIDER} } = ${PAGE_STORE_MODULE};
export { ${PAGE_STORE_PROVIDER} };` : `
const { Provider: ${PAGE_STORE_PROVIDER}, getState } = ${PAGE_STORE_MODULE};
const ${PAGE_STORE_INITIAL_STATES} = getState();
export { ${PAGE_STORE_PROVIDER}, ${PAGE_STORE_INITIAL_STATES} };`;

  return importStoreStatement + source + exportStoreProviderStatement;
}

/**
 * Get the page store path which is at the same directory level.
 * @param {string} id Route absolute path.
 * @returns {string|undefined}
 */
function getPageStorePath(id: string): string | undefined {
  const dir = path.dirname(id);
  const result = fg.sync(storeFilePattern, { cwd: dir, deep: 1 });
  return result.length ? path.join(dir, result[0]) : undefined;
}

function isLayout(id: string): boolean {
  const extname = path.extname(id);
  const idWithoutExtname = id.substring(0, id.length - extname.length);
  return idWithoutExtname.endsWith('layout');
}

/**
 * Check the current route component if there is layout.tsx at the same directory level.
 * @param {string} id Route absolute path.
 * @returns {boolean}
 */
function isLayoutExisted(id: string): boolean {
  const dir = path.dirname(id);
  const result = fg.sync('layout.{js,jsx,tsx}', { cwd: dir, deep: 1 });
  return !!result.length;
}

function getAppStorePath(srcPath: string) {
  const result = fg.sync(storeFilePattern, { cwd: srcPath, deep: 1 });
  return result.length ? path.join(srcPath, result[0]) : undefined;
}

export default plugin;
