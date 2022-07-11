import * as path from 'path';
import consola from 'consola';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { AppConfig } from '@ice/types';

interface Options {
  serverCompiler: ServerCompiler;
  rootDir: string;
}

let appConfig: AppConfig;

export const getAppConfig = (): AppConfig => {
  return appConfig;
};

export async function compileAppConfig({ rootDir, serverCompiler }: Options) {
  const outfile = path.join(rootDir, 'node_modules', 'entry.mjs');
  // TODO: remove top level calls to ensure that appConfig is always returned successfully in build time
  await serverCompiler({
    entryPoints: [path.join(rootDir, 'src/app')],
    outfile,
    format: 'esm',
    inject: [],
  });
  appConfig = (await import(outfile)).default;
  consola.debug('Compile app config by esbuild: ', appConfig);
  return appConfig;
}
