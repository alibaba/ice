import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { globbySync } from 'globby';

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
};

const commonDeps = ['terser', 'tapable', 'cssnano', 'terser-webpack-plugin', 'webpack', 'schema-utils',
'lodash', 'postcss-preset-env', 'loader-utils', 'find-up', 'common-path-prefix'];

const webpackDevServerDeps = ['bonjour-service', 'colorette', 'compression', 'connect-history-api-fallback',
'default-gateway', 'express', 'graceful-fs', 'http-proxy-middleware',
'ipaddr.js', 'open', 'p-retry', 'portfinder', 'rimraf', 'selfsigned', 'serve-index',
'sockjs', 'spdy', 'webpack-dev-middleware', 'ws'];

commonDeps.concat(webpackDevServerDeps).forEach(dep => taskExternals[dep] = `@ice/bundles/compiled/${dep}`);

function replaceDeps(code: string, deps: string[]) {
  return deps.reduce((acc, curr) => {
    return acc
      // cjs
      .replace(new RegExp(`require\\(["']${curr}["']\\)`, 'g'), `require("${`@ice/bundles/compiled/${curr}`}")`)
      // esm
      .replace(new RegExp(`from ["']${curr}["']`, 'g'), `from "${`@ice/bundles/compiled/${curr}`}"`);
  }, code);
}

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
    'postcss-preset-env', 'postcss-nested', 'postcss-modules', 'postcss-plugin-rpx2vw',
    'webpack-bundle-analyzer', 'es-module-lexer', 'terser',
    'eslint-webpack-plugin', 'copy-webpack-plugin', 'cacache', 'ora', 'unplugin',
    // Dependencies of react-refresh-webpack-plugin.
    'loader-utils', 'source-map', 'find-up', 'common-path-prefix',
    // Dependencies of webpack-dev-server.
    ...webpackDevServerDeps,
  ].map((pkgName) => ({ pkgName })),
  {
    pkgName: 'unplugin',
    declaration: false,
    emptyDir: false,
    file: 'node_modules/unplugin/dist/webpack/loaders/transform.js',
    bundleName: 'webpack/loaders/transform.js',
  },
  {
    pkgName: 'unplugin',
    declaration: false,
    emptyDir: false,
    file: 'node_modules/unplugin/dist/webpack/loaders/load.js',
    bundleName: 'webpack/loaders/load.js',
  },
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
      return resolvePath.includes('./utils') && resolveId.includes('css-minimizer-webpack-plugin/dist');
    },
  },
  {
    pkgName: 'mini-css-extract-plugin',
    skipCompile: true,
    patch: () => {
      // copy packages
      const pkgPath = path.join(__dirname, '../node_modules/mini-css-extract-plugin');
      const targetPath = path.join(__dirname, '../compiled/mini-css-extract-plugin');
      const entryPath = path.join(targetPath, 'dist/index.js');
      fs.copySync(path.join(pkgPath, 'dist'), path.join(targetPath, 'dist'));
      fs.copyFileSync(path.join(targetPath, 'index.d.ts'), path.join(targetPath, 'dist/index.d.ts'));
      fs.writeFileSync(entryPath, fs.readFileSync(entryPath, 'utf-8').replace('schema-utils', '@ice/bundles/compiled/schema-utils/index.js'));
    },
  },
  {
    pkgName: 'terser-webpack-plugin',
    matchCopyFiles: (data: { resolvePath: string; resolveId: string }): boolean => {
      const { resolvePath } = data;
      return resolvePath.endsWith('./utils') || resolvePath.endsWith('.json');
    },
  },
  {
    pkgName: 'webpack-dev-server',
    skipCompile: true,
    patch: () => {
      // Copy webpack-dev-server while all dependencies has been packed.
      const pkgPath = path.join(__dirname, '../node_modules/webpack-dev-server');
      const filePaths = globbySync(['**/*'], { cwd: pkgPath, ignore: ['node_modules', 'types', 'bin'] });
      filePaths.forEach((filePath) => {
        fs.ensureDirSync(path.join(__dirname, `../compiled/webpack-dev-server/${path.dirname(filePath)}`));
        const sourcePath = path.join(pkgPath, filePath);
        const targetPath = path.join(__dirname, `../compiled/webpack-dev-server/${filePath}`);
        if (path.extname(filePath) === '.js') {
          const fileContent = fs.readFileSync(sourcePath, 'utf8');
          fs.writeFileSync(targetPath, replaceDeps(fileContent, webpackDevServerDeps.concat(commonDeps)));
        } else {
          fs.copyFileSync(sourcePath, targetPath);
        }
      });
    },
  },
  {
    pkgName: '@pmmmwh/react-refresh-webpack-plugin',
    skipCompile: true,
    patch: () => {
      // Copy @pmmmwh/react-refresh-webpack-plugin while all dependencies has been packed.
      const pkgPath = path.join(__dirname, '../node_modules/@pmmmwh/react-refresh-webpack-plugin');
      const filePaths = globbySync(['**/*'], { cwd: pkgPath, ignore: ['node_modules', 'types'] });
      filePaths.forEach((filePath) => {
        fs.ensureDirSync(path.join(__dirname, `../compiled/@pmmmwh/react-refresh-webpack-plugin/${path.dirname(filePath)}`));
        const sourcePath = path.join(pkgPath, filePath);
        const targetPath = path.join(__dirname, `../compiled/@pmmmwh/react-refresh-webpack-plugin/${filePath}`);
        if (path.extname(filePath) === '.js') {
          const fileContent = fs.readFileSync(sourcePath, 'utf8');
          // Add source-map for react-refresh-webpack-plugin, while other dependencies should pack it.
          fs.writeFileSync(targetPath, replaceDeps(fileContent, commonDeps.concat('source-map')));
        } else {
          fs.copyFileSync(sourcePath, targetPath);
        }
      });
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
      const pkgPath = path.join(__dirname, '../node_modules/webpack');
      const targetPath = path.join(__dirname, '../compiled/webpack');
      fs.copySync(path.join(pkgPath, 'hot'), path.join(targetPath, 'hot'));
      fs.copySync(path.join(__dirname, '../webpack/packages'), targetPath);
    },
  },
];

export default tasks;
