import * as path from 'path';
import type { Config, Plugin } from '@ice/types';
import micromatch from 'micromatch';
import fg from 'fast-glob';
import { PAGE_STORE_MODULE, PAGE_STORE_PROVIDER, PAGE_STORE_INITIAL_STATES } from './constants.js';

interface Options {
  resetPageState?: boolean;
}

const PLUGIN_NAME = '@ice/plugin-store';
const storeFilePattern = '**/store.{js,ts}';
const ignoreStoreFilePatterns = ['**/models/**', storeFilePattern];

const plugin: Plugin<Options> = (options) => ({
  name: PLUGIN_NAME,
  setup: ({ onGetConfig, modifyUserConfig, generator, context: { rootDir, userConfig }, watch }) => {
    const { resetPageState = false } = options || {};
    const srcDir = path.join(rootDir, 'src');
    const pageDir = path.join(srcDir, 'pages');

    modifyUserConfig('routes', {
      ...(userConfig.routes || {}),
      ignoreFiles: [...(userConfig?.routes?.ignoreFiles || []), ...ignoreStoreFilePatterns],
    });

    if (getAppStorePath(srcDir)) {
      generator.addRuntimeOptions({
        source: '@/store',
        specifier: 'appStore',
      });
    }

    watch.addEvent([
      /src\/store.(js|ts)$/,
      (event) => {
        if (event === 'unlink') {
          generator.removeRuntimeOptions('@/store');
        }
        if (event === 'add') {
          generator.addRuntimeOptions({
            source: '@/store',
            specifier: 'appStore',
          });
        }
        if (['add', 'unlink'].includes(event)) {
          generator.render();
        }
      },
    ]);

    onGetConfig(config => {
      config.transformPlugins = [
        ...(config.transformPlugins || []),
        exportStoreProviderPlugin({ pageDir, resetPageState }),
      ];
      return config;
    });

    // Export store api: createStore, createModel from `.ice/index.ts`.
    generator.addExport({
      specifier: ['createStore', 'createModel'],
      source: '@ice/plugin-store/esm/runtime',
      type: false,
    });
  },
  runtime: `${PLUGIN_NAME}/esm/runtime`,
});

function exportStoreProviderPlugin({ pageDir, resetPageState }: { pageDir: string; resetPageState: boolean }): Config['transformPlugins'][0] {
  return {
    name: 'export-store-provider',
    enforce: 'post',
    transformInclude: (id) => {
      return id.startsWith(pageDir.split(path.sep).join('/')) && !micromatch.isMatch(id, ignoreStoreFilePatterns);
    },
    transform: async (source, id) => {
      const pageStorePath = getPageStorePath(id);
      if (pageStorePath) {
        if (
          isLayout(id) || // Current id is layout.
          !isLayoutExisted(id) // If current id is route and there is no layout in the current dir.
        ) {
          return exportPageStore(source, resetPageState);
        }
      }
      return source;
    },
  };
}

function exportPageStore(source: string, resetPageState: boolean) {
  const importStoreStatement = `import ${PAGE_STORE_MODULE} from './store';\n`;
  const exportStoreProviderStatement = resetPageState ? `
const { Provider: ${PAGE_STORE_PROVIDER}, getState } = ${PAGE_STORE_MODULE};
const ${PAGE_STORE_INITIAL_STATES} = getState();
export { ${PAGE_STORE_PROVIDER}, ${PAGE_STORE_INITIAL_STATES} };` : `
const { Provider: ${PAGE_STORE_PROVIDER} } = ${PAGE_STORE_MODULE};
export { ${PAGE_STORE_PROVIDER} };`;

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
