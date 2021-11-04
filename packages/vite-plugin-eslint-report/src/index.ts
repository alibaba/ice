import * as path from 'path';
import { createFilter } from '@rollup/pluginutils';
import type { Plugin } from 'vite';
import type { ESLint } from 'eslint';
import { Worker } from 'worker_threads';
import * as debounce from 'lodash.debounce';

export interface Options {
  ignoreInitial?: boolean;
  cache?: boolean;
  fix?: boolean;
  include?: string | string[];
  exclude?: string | string[];
  configFile?: string;
  formatter?: string | ESLint.Formatter;
}

function normalizePathForLint(id: string): string {
  return path.relative(process.cwd(), id).split(path.sep).join('/');
}

const eslintPlugin = (options: Options): Plugin => {
  const { include, exclude, ignoreInitial } = options;
  let worker: Worker;

  const filter = createFilter(include || [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
  ], exclude || /node_modules/);
  const lintFile = (workerThread: Worker, file: string) => {
    workerThread.postMessage({
      type: 'lintFile',
      payload: {
        file: normalizePathForLint(file),
        formatter: options.formatter,
      }
    });
  };
  const debounceLintFile = debounce(lintFile, 500);
  
  return {
    name: 'vite-plugin-eslint-report',
    configureServer() {
      // active in dev mode
      // eslint-disable-next-line global-require
      const initMainThread = require('./eslint').default;
      worker = initMainThread();
      worker.postMessage({
        type: 'configESLint',
        payload: options
      });
    },
    handleHotUpdate({ file }) {
      // hot update will get current changed file
      // debounce for lint in case of flush too many changes in short time
      if (filter(file)) {
        debounceLintFile(worker, file);
      }
    },
    async transform(_, id) {
      // skip eslint when first compile
      if (!filter(id)) {
        return null;
      }
      if (!ignoreInitial) {
        lintFile(worker, id);
      }
      return null;
    },
  };
};

export default eslintPlugin;
