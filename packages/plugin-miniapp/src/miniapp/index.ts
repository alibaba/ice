/**
 * Based on [@tarojs/webpack5-runner](https://github.com/NervJS/taro/tree/next/packages/taro-webpack5-runner) with respect ❤️
 * Licensed under the MIT License
 * https://github.com/NervJS/taro/blob/next/LICENSE
 * */

import * as path from 'path';
import { createRequire } from 'node:module';
import fg from 'fast-glob';
import type { Config } from '@ice/types';
import getMiniappPlatformConfig from '../platforms/index.js';
import getMiniappWebpackConfig from './webpack/index.js';

const require = createRequire(import.meta.url);

// The same as @ice/webpack-config
function getEntry(rootDir: string, runtimeDir: string) {
  // check entry.client.ts
  let entryFile = fg.sync('entry.client.{tsx,ts,jsx.js}', {
    cwd: path.join(rootDir, 'src'),
    absolute: true,
  })[0];
  if (!entryFile) {
    // use generated file in template directory
    entryFile = path.join(rootDir, runtimeDir, 'entry.client.ts');
  }
  return {
    main: entryFile,
  };
}

const getMiniappTask = ({
  rootDir,
  command,
  platform,
  configAPI,
  dataCache,
  runtimeDir,
  cacheDir,
}): Config => {
  const entry = getEntry(rootDir, runtimeDir);
  const mode = command === 'start' ? 'development' : 'production';
  const { template, globalObject, fileType } = getMiniappPlatformConfig(platform);

  const { plugins, module } = getMiniappWebpackConfig({
    rootDir,
    template,
    fileType,
    configAPI,
  });
  const defaultLogging = command === 'start' ? 'summary' : 'summary assets';
  return {
    mode,
    entry,
    outputDir: 'build',
    output: {
      chunkLoadingGlobal: 'webpackJsonp',
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
      globalObject,
      enabledLibraryTypes: [],
    },
    sourceMap: command === 'start' ? 'cheap-module-source-map' : false,
    alias: {
      ice: path.join(rootDir, runtimeDir, 'index.ts'),
      '@': path.join(rootDir, 'src'),
      // 小程序使用 regenerator-runtime@0.11
      'regenerator-runtime': require.resolve('regenerator-runtime'),
      // 开发组件库时 link 到本地调试，runtime 包需要指向本地 node_modules 顶层的 runtime，保证闭包值 Current 一致，shared 也一样
      '@ice/miniapp-runtime': require.resolve('@ice/miniapp-runtime'),
      '@ice/shared': require.resolve('@ice/shared'),
      'react-dom$': require.resolve('@ice/miniapp-react-dom'),
    },
    cacheDir: path.join(rootDir, cacheDir),
    plugins,
    loaders: module.rules,
    optimization: {
      sideEffects: true,
      usedExports: true,
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          default: false,
          defaultVendors: false,
          common: {
            name: 'common',
            minChunks: 2,
            priority: 1,
          },
          vendors: {
            name: 'vendors',
            minChunks: 2,
            test: (module: any) => /[\\/]node_modules[\\/]/.test(module.resource),
            priority: 10,
          },
          ice: {
            name: 'ice',
            test: (module: any) => /@ice[\\/][a-z]+/.test(module.context),
            priority: 101,
          },
        },
      },
    },
    performance: {
      maxEntrypointSize: 2 * 1000 * 1000,
    },
    devServer: {}, // No need to use devServer in miniapp
    enableCopyPlugin: true,
    swcOptions: {
      // compatible with former design that miniapp represents ali miniapp
      keepPlatform: platform === 'ali-miniapp' ? 'miniapp' : platform,
      removeExportExprs: ['getServerData', 'getStaticData'],
      getRoutePaths: () => {
        const routes = dataCache.get('routes');

        const routeManifest = JSON.parse(routes)?.routeManifest || {};
        const routeFiles = Object.keys(routeManifest).map((key) => {
          const { file } = routeManifest[key];
          return `src/pages/${file}`;
        });

        return routeFiles;
      },
    },
    cssFilename: `[name]${fileType.style}`,
    cssChunkFilename: `[name]${fileType.style}`,
    logging: process.env.WEBPACK_LOGGING || defaultLogging,
  };
};

export default getMiniappTask;
