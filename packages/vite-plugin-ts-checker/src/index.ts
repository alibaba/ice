import { spawn } from 'child_process';
import * as os from 'os';
import type { Plugin, ConfigEnv } from 'vite';
import { Worker } from 'worker_threads';

const spawnTsChecker = () => {
  return new Promise<number>((resolve) => {
    const tscBin: [string, string[]] = ['tsc', ['--noEmit']];
    const proc = spawn(...tscBin, {
      stdio: 'inherit',
      shell: os.platform() === 'win32',
    });
    proc.on('exit', (code) => {
      if (code !== null && code !== 0) {
        resolve(code);
      } else {
        resolve(0);
      }
    });
  });
};

const vitePluginTsChecker = (): Plugin => {
  let rootDir = process.cwd();
  let viteMode: ConfigEnv['command'] | undefined;
  let worker: Worker;
  
  return {
    name: 'vite-plugin-ts-checker',
    config: (config, env) => {
      viteMode = env.command;
      rootDir = config.root;
      // only work in dev mode
      if (viteMode === 'serve') {
        // eslint-disable-next-line global-require
        worker = require('./tsChecker').default;
      }
    },
    buildStart: () => {
      // run a bin command in a separated process when build
      if (viteMode !== 'build') return;
      // spawn an async runner that we don't wait for in order to avoid blocking the build from continuing in parallel
      (async () => {
        const exitCode = await spawnTsChecker();
        if (exitCode !== 0) process.exit(exitCode);
      })();
    },
    configureServer() {
      if (worker) {
        worker.postMessage({
          type: 'configTsCheck',
          payload: { rootDir },
        });
      }
    }
  };
};

export default vitePluginTsChecker;
