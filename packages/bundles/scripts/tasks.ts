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
  esbuild: 'esbuild',
};

// Override the `react`, `react-dom` and `scheduler`'s package names to avoid
// "The name `react` was looked up in the Haste module map" warnings.
function overridePackageName(source: string, channel: string) {
  const json = JSON.parse(source);
  json.name = `${json.name}-${channel}`;
  return JSON.stringify(
    {
      name: json.name,
      main: json.main,
      exports: json.exports,
      dependencies: json.dependencies,
      peerDependencies: json.peerDependencies,
      browser: json.browser,
    },
    null,
    2,
  );
}

interface CopyModulesOptions {
  loaders?: { test: RegExp; handler: (code: string, id: string) => string }[];
  channel?: string;
  ignore?: string[];
}

function copyModules(rules: string[], packageName: string, option?: CopyModulesOptions) {
  const { channel, ignore, loaders } = option || {};
  const pkgDir = path.join(__dirname, `../node_modules/${packageName}${channel ? `-${channel}` : ''}`);
  const targetDir = path.join(__dirname, `../compiled/${packageName}`);
  const filePaths = globbySync(rules, { cwd: pkgDir, ignore: ignore ?? ['node_modules'] });
  filePaths.forEach((filePath) => {
    fs.ensureDirSync(path.join(targetDir, path.dirname(filePath)));
    const sourcePath = path.join(pkgDir, filePath);
    const targetPath = path.join(targetDir, filePath);
    // Only deal with js files.
    if (loaders) {
      const loader = loaders.find(({ test }) => test.test(filePath));
      if (loader) {
        const fileContent = fs.readFileSync(sourcePath, 'utf8');
        fs.writeFileSync(targetPath, loader.handler(fileContent, filePath));
        return;
      }
    }
    fs.copyFileSync(sourcePath, targetPath);
  });
}

const commonDeps = ['terser', 'tapable', 'cssnano', 'terser-webpack-plugin', 'webpack', 'schema-utils',
  'lodash', 'postcss-preset-env', 'loader-utils', 'find-up', 'common-path-prefix', 'magic-string'];

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
    'webpack-bundle-analyzer', 'es-module-lexer', 'terser', 'trusted-cert', 'magic-string',
    'eslint-webpack-plugin', 'copy-webpack-plugin', 'cacache', 'ora', 'unplugin',
    // Dependencies of react-refresh-webpack-plugin.
    'loader-utils', 'source-map', 'find-up', 'common-path-prefix',
    // Dependencies of webpack-dev-server.
    ...webpackDevServerDeps,
  ].map((pkgName) => ({ pkgName, externals: taskExternals })),
  {
    pkgName: 'esbuild-register',
    file: 'node_modules/esbuild-register/dist/node.js',
    externals: taskExternals,
    bundleName: 'node.js',
  },
  {
    pkgName: 'unplugin',
    declaration: false,
    emptyDir: false,
    externals: taskExternals,
    file: 'node_modules/unplugin/dist/webpack/loaders/transform.js',
    bundleName: 'webpack/loaders/transform.js',
  },
  {
    pkgName: 'unplugin',
    declaration: false,
    emptyDir: false,
    externals: taskExternals,
    file: 'node_modules/unplugin/dist/webpack/loaders/load.js',
    bundleName: 'webpack/loaders/load.js',
  },
  {
    pkgName: 'unplugin',
    declaration: false,
    emptyDir: false,
    externals: taskExternals,
    file: 'node_modules/unplugin/dist/rspack/loaders/transform.js',
    bundleName: 'rspack/loaders/transform.js',
  },
  {
    pkgName: 'unplugin',
    declaration: false,
    emptyDir: false,
    externals: taskExternals,
    file: 'node_modules/unplugin/dist/rspack/loaders/load.js',
    bundleName: 'rspack/loaders/load.js',
  },
  {
    // pack main package
    pkgName: 'fork-ts-checker-webpack-plugin',
    externals: taskExternals,
    patch: () => {
      // Hack: ncc will prebundle typescript because of require.resolve('typescript'), overwrite to make it externaled.
      const targetPath = path.join(__dirname, '../compiled/fork-ts-checker-webpack-plugin/typescript.js');
      fs.writeFileSync(targetPath, 'module.exports = require(\'typescript\');');
    },
  },
  {
    // pack worker file
    pkgName: 'fork-ts-checker-webpack-plugin',
    externals: taskExternals,
    declaration: false,
    emptyDir: false,
    file: 'node_modules/fork-ts-checker-webpack-plugin/lib/typescript/worker/get-issues-worker.js',
    bundleName: 'typescript/worker/get-issues-worker.js',
  },
  {
    // pack worker file
    pkgName: 'fork-ts-checker-webpack-plugin',
    externals: taskExternals,
    declaration: false,
    emptyDir: false,
    file: path.join('node_modules', 'fork-ts-checker-webpack-plugin/lib/typescript/worker/get-dependencies-worker.js'),
    bundleName: 'typescript/worker/get-dependencies-worker.js',
  },
  {
    pkgName: 'css-minimizer-webpack-plugin',
    externals: taskExternals,
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
    externals: taskExternals,
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
      // Overwrite RefreshUtils.js which is customized for ice.js.
      fs.copyFileSync(path.join(__dirname, '../override/RefreshUtils.js'), path.join(pkgPath, 'lib/runtime/RefreshUtils.js'));
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
  {
    pkgName: 'react',
    skipCompile: true,
    declaration: false,
    patch: () => {
      copyModules(
        ['*.{json,js}', 'cjs/**/*.js', 'LICENSE'],
        'react',
        {
          channel: 'builtin',
          loaders: [
            { test: /package.json$/, handler: (source) => overridePackageName(source, 'builtin') },
            { test: /\.js$/, handler: (source) => replaceDeps(source, ['scheduler']) },
          ],
        },
      );
    },
  },
  {
    pkgName: 'react-dom',
    skipCompile: true,
    declaration: false,
    patch: () => {
      copyModules(
        ['*.{json,js}', 'cjs/**/*.js', 'LICENSE'],
        'react-dom',
        {
          channel: 'builtin',
          loaders: [
            { test: /package.json$/, handler: (source) => overridePackageName(source, 'builtin') },
            { test: /\.js$/, handler: (source) => replaceDeps(source, ['scheduler', 'react']) },
          ],
          // Ignore unused files.
          ignore: [
            'node_modules',
            'static.js',
            'static.node.js',
            'static.browser.js',
            'unstable_testing.js',
            'test-utils.js',
            'server.bun.js',
            'cjs/react-dom-server.bun.development.js',
            'cjs/react-dom-server.bun.production.min.js',
            'cjs/react-dom-test-utils.development.js',
            'cjs/react-dom-test-utils.production.min.js',
            'unstable_server-external-runtime.js',
          ],
        },
      );
    },
  },
  {
    pkgName: 'react-server-dom-webpack',
    skipCompile: true,
    patch: () => {
      copyModules(
        ['*.{json,js}', 'cjs/**/*.js', 'LICENSE'],
        'react-server-dom-webpack',
        {
          loaders: [
            { test: /package.json$/,
handler: (source) => {
              const json = JSON.parse(source);
              // Compatible with both esm and cjs.
              json.exports['./plugin.js'] = './plugin.js';
              return JSON.stringify(json, null, 2);
            } },
          ],
        },
      );
    },
  },
  {
    pkgName: 'scheduler',
    skipCompile: true,
    declaration: false,
    patch: () => {
      copyModules(
        ['*.{json,js}', 'cjs/**/*.js', 'LICENSE'],
        'scheduler',
        {
          channel: 'builtin',
          loaders: [
            { test: /package.json$/, handler: (source) => overridePackageName(source, 'builtin') },
          ],
        },
      );
    },
  },
  {
    pkgName: '@rspack/core',
    skipCompile: true,
    declaration: false,
    patch: () => {
      const pkgPath = path.join(__dirname, '../node_modules/@rspack/core');
      const targetPath = path.join(__dirname, '../compiled/@rspack/core');
      // Copy the entire directory.
      // filter out js files and replace with compiled files.
      const filePaths = globbySync(['**/*'], { cwd: pkgPath, ignore: ['node_modules'] });
      const filesAddOverwrite = [
        'dist/config/adapter.js',
        'dist/config/defaults.js',
        'dist/config/zod.js',
        'dist/config/normalization.js',
        'dist/util/bindingVersionCheck.js',
      ];
      filePaths.forEach((filePath) => {
        const sourcePath = path.join(pkgPath, filePath);
        const targetFilePath = path.join(targetPath, filePath);
        fs.ensureDirSync(path.dirname(targetFilePath));
        if (path.extname(filePath) === '.js') {
          const matched = filesAddOverwrite.some(filePath => {
            const matched = sourcePath.split(path.sep).join('/').includes(filePath);
            if (matched) {
              fs.copyFileSync(path.join(__dirname, `../override/rspack/${path.basename(filePath)}`), targetFilePath);
            }
            return matched;
          });
          if (!matched) {
            const fileContent = fs.readFileSync(sourcePath, 'utf8');
            fs.writeFileSync(
              targetFilePath,
              replaceDeps(fileContent, ['tapable', 'schema-utils', 'graceful-fs'])
                .replace(new RegExp('require\\(["\']@rspack/binding["\']\\)', 'g'), 'require("@ice/pack-binding")'),
            );
          }
        } else {
          fs.copyFileSync(sourcePath, targetFilePath);
        }
      });
    },
  },
  {
    pkgName: '@rspack/dev-server',
    skipCompile: true,
    patch: () => {
      // Copy webpack-dev-server while all dependencies has been packed.
      const pkgPath = path.join(__dirname, '../node_modules/@rspack/dev-server');
      const filePaths = globbySync(['**/*'], { cwd: pkgPath, ignore: ['node_modules', 'types', 'bin'] });
      filePaths.forEach((filePath) => {
        fs.ensureDirSync(path.join(__dirname, `../compiled/@rspack/dev-server/${path.dirname(filePath)}`));
        const sourcePath = path.join(pkgPath, filePath);
        const targetPath = path.join(__dirname, `../compiled/@rspack/dev-server/${filePath}`);
        if (path.extname(filePath) === '.js') {
          const fileContent = fs.readFileSync(sourcePath, 'utf8');
          fs.writeFileSync(targetPath,
            replaceDeps(fileContent, webpackDevServerDeps.concat([...commonDeps, '@rspack/core', 'webpack-dev-server']))
             .replace(/webpack-dev-server\/client\/clients/g, '@ice/bundles/compiled/webpack-dev-server/client/clients'),
          );
        } else {
          fs.copyFileSync(sourcePath, targetPath);
        }
      });
    },
  },
  {
    pkgName: '@rspack/plugin-react-refresh',
    skipCompile: true,
    patch: () => {
      const pkgPath = path.join(__dirname, '../node_modules/@rspack/plugin-react-refresh');
      const filePaths = globbySync(['**/*'], { cwd: pkgPath, ignore: ['node_modules'] });
      filePaths.forEach((filePath) => {
        fs.ensureDirSync(path.join(__dirname, `../compiled/@rspack/plugin-react-refresh/${path.dirname(filePath)}`));
        const sourcePath = path.join(pkgPath, filePath);
        const targetPath = path.join(__dirname, `../compiled/@rspack/plugin-react-refresh/${filePath}`);
        if (path.extname(filePath) === '.js') {
          const fileContent = fs.readFileSync(sourcePath, 'utf8');
          fs.writeFileSync(targetPath,
            replaceDeps(fileContent, webpackDevServerDeps.concat([
              ...commonDeps,
              '@rspack/core',
            ])).replace(/@pmmmwh\/react-refresh-webpack-plugin\/lib\/runtime\/RefreshUtils/g, '@ice/bundles/compiled/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils'),
          );
        } else {
          fs.copyFileSync(sourcePath, targetPath);
        }
      });
    },
  },
];

export default tasks;
