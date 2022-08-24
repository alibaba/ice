import * as path from 'path';

export const RUNTIME_TMP_DIR = '.ice';
export const ROUTER_MANIFEST = path.join(RUNTIME_TMP_DIR, 'route-manifest.json');
export const ASSETS_MANIFEST = path.join(RUNTIME_TMP_DIR, 'assets-manifest.json');
export const SERVER_ENTRY = path.join(RUNTIME_TMP_DIR, 'entry.server.ts');
export const DATA_LOADER_ENTRY = path.join(RUNTIME_TMP_DIR, 'data-loader.ts');
export const SERVER_OUTPUT_DIR = 'server';
export const CACHE_DIR = path.join('node_modules', '.cache');
export const BUILDIN_ESM_DEPS = [
  '@ice/runtime',
];
export const BUILDIN_CJS_DEPS = [
  'react',
  'react-dom',
  '@uni/env',
  'universal-env',
];
