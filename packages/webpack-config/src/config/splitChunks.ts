import * as path from 'path';
import { createRequire } from 'module';
import crypto from 'crypto';
import type webpack from 'webpack';

interface TestModule {
  size: Function;
  nameForCondition: Function;
}
interface NameModule {
  libIdent?: Function;
  type: string;
  updateHash: (hash: crypto.Hash) => void;
}
const require = createRequire(import.meta.url);

export const FRAMEWORK_BUNDLES = [
  // runtime dependencies
  'react', 'react-dom', 'react-router', 'react-router-dom',
];


const isModuleCSS = (module: { type: string }): boolean => {
  return (
    // mini-css-extract-plugin
    module.type === 'css/mini-extract' ||
    // extract-css-chunks-webpack-plugin
    module.type === 'css/extract-css-chunks'
  );
};
const getSplitChunksConfig = (rootDir: string): webpack.Configuration['optimization']['splitChunks'] => {
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
      frameworkPaths.push(packageDir);
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
  return {
    chunks: 'all',
    cacheGroups: {
      framework: {
        chunks: 'all',
        name: 'framework',
        test(module: TestModule) {
          const resource = module.nameForCondition?.();
          return resource ? frameworkPaths.some((pkgPath) => resource.startsWith(pkgPath)) : false;
        },
        priority: 40,
        enforce: true,
      },
      // Fork from https://github.com/vercel/next.js/blob/1b2636763c39433dcc52756d158b4a444abc85cb/packages/next/build/webpack-config.ts#L1463-L1494
      lib: {
        test(module: TestModule) {
          return module.size() > 160000 && /node_modules[/\\]/.test(module.nameForCondition() || '');
        },
        name(module: NameModule) {
          const hash = crypto.createHash('sha1');
          if (isModuleCSS(module)) {
            module.updateHash(hash);
          } else {
            if (!module.libIdent) {
              throw new Error(
                `Encountered unknown module type: ${module.type}.`,
              );
            }
            hash.update(module.libIdent({ context: rootDir }));
          }
          return hash.digest('hex').substring(0, 8);
        },
        priority: 30,
        minChunks: 1,
        reuseExistingChunk: true,
      },
    },
    maxInitialRequests: 25,
    minSize: 20000,
  };
};

export default getSplitChunksConfig;
