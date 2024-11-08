import * as path from 'path';
import { createRequire } from 'module';
import type { Configuration } from '@rspack/core';

const require = createRequire(import.meta.url);
const FRAMEWORK_BUNDLES = [
  'react', 'react-dom', 'react-router', 'react-router-dom',
];

function transformPathForRegex(str: string) {
  return process.platform === 'win32'
    // Remove trailing '\' at the end of the string and replace '\' with '\\' for regex compatibility in win32.
    ? str.replace(/\\$/, '').replace(/\\/g, '\\') : str;
}

export const getFrameworkBundles = (rootDir: string) => {
  const frameworkPaths: string[] = [];
  const visitedFramework = new Set<string>();
  function addPackagePath(packageName: string, dir: string) {
    try {
      if (visitedFramework.has(packageName)) {
        return;
      }
      visitedFramework.add(packageName);
      const packageJsonPath = require.resolve(`${packageName}/package.json`, {
        paths: [dir],
      });
      const packageDir = path.join(packageJsonPath, '../');
      if (frameworkPaths.includes(packageDir)) return;
      frameworkPaths.push(transformPathForRegex(packageDir));
      const dependencies = require(packageJsonPath).dependencies || {};
      for (const name of Object.keys(dependencies)) {
        addPackagePath(name, packageDir);
      }
    } catch (_) {
      // Do not error on resolve framework package
    }
  }

  FRAMEWORK_BUNDLES.forEach((packageName) => {
    addPackagePath(packageName, rootDir);
  });
  return frameworkPaths;
};

export const getChunksStrategy = (rootDir: string) => {
  const frameworkPaths = getFrameworkBundles(rootDir);
  // Create test rule for framework.
  const frameworkTest = new RegExp(frameworkPaths.join('|'));
  return {
    chunks: 'all',
    cacheGroups: {
      framework: {
        chunks: 'all',
        name: 'framework',
        test: frameworkTest,
        priority: 40,
        enforce: true,
      },
      lib: {
        test: /[\\/]node_modules[\\/]/,
        priority: 30,
        minChunks: 1,
        reuseExistingChunk: true,
      },
    },
    maxInitialRequests: 25,
    minSize: 20000,
  };
};

// @ts-expect-error
export const getVendorStrategy = (options: Configuration['splitChunks']) => {
  return {
    ...options,
    chunks: 'all',
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: 10,
        name: 'vendors',
        reuseExistingChunk: true,
      },
    },
  };
};

const getSplitChunks = (_: string, strategy: string | boolean) => {
  if (strategy === false) {
    // Set minChunks to a large number to disable the splitChunks feature.
    // the value of Infinity is not work properly for this version of rspack.
    return { minChunks: 100000, cacheGroups: { default: false } };
  } else if (typeof strategy === 'string' && ['page-vendors', 'vendors'].includes(strategy)) {
    const splitChunksOptions = strategy === 'page-vendors' ? { chunks: 'all' } : {};
    return getVendorStrategy(splitChunksOptions);
  }
  return {};
};

export default getSplitChunks;
