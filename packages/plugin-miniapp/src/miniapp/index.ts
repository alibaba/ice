/**
 * Based on [@tarojs/webpack5-runner](https://github.com/NervJS/taro/tree/next/packages/taro-webpack5-runner) with respect ❤️
 * Licensed under the MIT License
 * https://github.com/NervJS/taro/blob/next/LICENSE
 * */
import * as path from 'path';
import { createRequire } from 'node:module';
import fs from 'fs-extra';
import fg from 'fast-glob';
import type { Config } from '@ice/app/esm/types';
import { mergeInternalComponents } from '@ice/shared';
import getMiniappTargetConfig from '../targets/index.js';
import getMiniappWebpackConfig from './webpack/index.js';

const require = createRequire(import.meta.url);

// The same as @ice/webpack-config
function getEntry(rootDir: string, runtimeDir: string) {
  // check entry.client.tsx
  let entryFile = fg.sync('entry.client.{tsx,ts,jsx.js}', {
    cwd: path.join(rootDir, 'src'),
    absolute: true,
  })[0];
  if (!entryFile) {
    // use generated file in template directory
    entryFile = path.join(rootDir, runtimeDir, 'entry.miniapp.tsx');
  }
  return {
    main: entryFile,
  };
}

const getMiniappTask = ({ rootDir, command, target, configAPI, runtimeDir, nativeConfig }): Config => {
  const entry = getEntry(rootDir, runtimeDir);
  const mode = command === 'start' ? 'development' : 'production';
  const { template, globalObject, fileType, projectConfigJson, modifyBuildAssets, components } = getMiniappTargetConfig(target);
  const { plugins, module } = getMiniappWebpackConfig({
    rootDir,
    template,
    fileType,
    configAPI,
    projectConfigJson,
    nativeConfig,
    modifyBuildAssets,
  });
  const isPublicDirExist = fs.existsSync(path.join(rootDir, 'public'));
  const defaultLogging = command === 'start' ? 'summary' : 'summary assets';

  mergeInternalComponents(components);

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
    cacheDir: path.join(rootDir, 'node_modules', '.cache'),
    sourceMap: command === 'start' ? 'cheap-module-source-map' : false,
    alias: {
      ice: path.join(rootDir, runtimeDir, 'index.miniapp.ts'),
      '@': path.join(rootDir, 'src'),
      // 小程序使用 regenerator-runtime@0.11
      'regenerator-runtime': require.resolve('regenerator-runtime'),
      '@swc/helpers': path.dirname(require.resolve('@swc/helpers/package.json')),
      '@ice/miniapp-runtime/esm/app': require.resolve('@ice/miniapp-runtime/app'),
      // 开发组件库时 link 到本地调试，runtime 包需要指向本地 node_modules 顶层的 runtime，保证闭包值 Current 一致，shared 也一样
      '@ice/miniapp-runtime': require.resolve('@ice/miniapp-runtime'),
      '@ice/shared': require.resolve('@ice/shared'),
      'react-dom$': require.resolve('@ice/miniapp-react-dom'),
    },
    // FIXME: enable cache will cause error, disable it temporarily
    enableCache: false,
    enableEnv: false,
    plugins,
    loaders: module?.rules,
    assetsManifest: false,
    fastRefresh: false,
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
    useDevServer: false,
    enableCopyPlugin: isPublicDirExist, // Only when public dir exists should copy-webpack-plugin be enabled
    swcOptions: {
      removeExportExprs: ['serverDataLoader', 'staticDataLoader'],
      compilationConfig: {
        jsc: {
          // 小程序强制编译到 es5
          target: 'es5',
        },
      },
    },
    cssFilename: `[name]${fileType.style}`,
    cssChunkFilename: `[name]${fileType.style}`,
    cssExtensionAlias: ['.qss', '.jxss', '.wxss', '.acss', '.ttss'],
    enableRpx2Vw: false, // No need to transform rpx to vw in miniapp
    logging: process.env.WEBPACK_LOGGING || defaultLogging,
  };
};

export default getMiniappTask;
