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
  
  return {
    name: 'vite-plugin-ts-checker',
    config: (config, env) => {
      viteMode = env.command;
      rootDir = config.root;
    },
    buildStart: () => {
      // run a bin command in a separated process when build
      if (viteMode === 'build') {
        // spawn an async runner that we don't wait for in order to avoid blocking the build from continuing in parallel
        (async () => {
          // just run tsc --noEmit when build no need to get createProgram for ts check
          const exitCode = await spawnTsChecker();
          if (exitCode !== 0) process.exit(exitCode);
        })();
      }
      
    },
    configureServer() {
      // only work in dev mode
      // require tsChecker in case of file of will run in worker thread
      // eslint-disable-next-line global-require
      const worker: Worker = require('./tsChecker').default;
      worker.postMessage({
        type: 'configTsCheck',
        payload: { rootDir },
      });
    }
  };
};

export default vitePluginTsChecker;
