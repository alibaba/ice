import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';

// @ts-expect-error
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const taskExternals = {
  // don't bundle caniuse-lite data so users can
  // update it manually
  'caniuse-lite': 'caniuse-lite',
  '/caniuse-lite(/.*)/': 'caniuse-lite$1',
  chokidar: 'chokidar',
  fibers: 'fibers',
  sass: 'sass',
  less: 'less',
  eslint: 'eslint',
  typescript: 'typescript',
  postcss: 'postcss',
  '@swc/core': '@swc/core',
  'jest-worker': 'jest-worker',
  terser: '@ice/bundles/compiled/terser',
  tapable: '@ice/bundles/compiled/tapable',
  cssnano: '@ice/bundles/compiled/cssnano',
  // depend by webpack
  'terser-webpack-plugin': '@ice/bundles/compiled/terser-webpack-plugin',
  webpack: '@ice/bundles/compiled/webpack',
  'schema-utils': '@ice/bundles/compiled/schema-utils',
  lodash: '@ice/bundles/compiled/lodash',
  'postcss-preset-env': '@ice/bundles/compiled/postcss-preset-env',
};

export function filterExternals(externals: Record<string, string>, keys: string[]) {
  const filterExternals = {};
  Object.keys(externals).forEach((externalKey) => {
    if (!keys.includes(externalKey)) {
      filterExternals[externalKey] = externals[externalKey];
    }
  });
  return filterExternals;
}

const tasks = [
  // simple task
  ...['cssnano', 'tapable', 'schema-utils', 'lodash',
    'less-loader', 'postcss-loader', 'sass-loader', 'css-loader',
    'postcss-preset-env', 'postcss-nested', 'postcss-modules',
    'webpack-bundle-analyzer', 'es-module-lexer', 'terser',
    'eslint-webpack-plugin',
  ].map((pkgName) => ({ pkgName })),
  {
    // pack main package
    pkgName: 'fork-ts-checker-webpack-plugin',
  },
  {
    // pack worker file
    pkgName: 'fork-ts-checker-webpack-plugin',
    declaration: false,
    emptyDir: false,
    file: 'node_modules/fork-ts-checker-webpack-plugin/lib/typescript/worker/get-issues-worker.js',
    bundleName: 'typescript/worker/get-issues-worker.js',
  },
  {
    // pack worker file
    pkgName: 'fork-ts-checker-webpack-plugin',
    declaration: false,
    emptyDir: false,
    file: path.join('node_modules', 'fork-ts-checker-webpack-plugin/lib/typescript/worker/get-dependencies-worker.js'),
    bundleName: 'typescript/worker/get-dependencies-worker.js',
  },
  {
    pkgName: 'css-minimizer-webpack-plugin',
    matchCopyFiles: (data: { resolvePath: string; resolveId: string }): boolean => {
      const { resolvePath, resolveId } = data;
      return resolvePath.endsWith('./utils') && resolveId.endsWith('css-minimizer-webpack-plugin/dist/index.js');
    },
  },
  {
    pkgName: 'terser-webpack-plugin',
    matchCopyFiles: (data: { resolvePath: string; resolveId: string }): boolean => {
      const { resolvePath, resolveId } = data;
      return resolvePath.endsWith('./utils') && resolveId.endsWith('terser-webpack-plugin/dist/index.js');
    },
  },
  {
    file: './webpack/bundle',
    pkgName: 'webpack',
    bundleName: 'bundle.js',
    externals: filterExternals(taskExternals, ['webpack']),
    minify: false,
    matchCopyFiles: (data: { resolvePath: string }): boolean => {
      const { resolvePath } = data;
      return resolvePath.endsWith('.runtime.js');
    },
    patch: () => {
      // copy packages
      const pkgPath = path.join(__dirname, 'node_modules/webpack');
      const targetPath = path.join(__dirname, 'compiled/webpack');
      fs.copySync(path.join(pkgPath, 'hot'), path.join(targetPath, 'hot'));
      fs.copySync(path.join(__dirname, 'webpack/packages'), targetPath);
    },
  },
];

export default tasks;
