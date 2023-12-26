import unplugin from '@ice/bundles/compiled/unplugin/index.js';
import type { BuildOptions } from 'esbuild';
import type { UnpluginOptions } from '@ice/bundles/compiled/unplugin/index.js';
import type { Config } from './types.js';
import compilationPlugin from './unPlugins/compilation.js';
import redirectImportPlugin from './unPlugins/redirectImport.js';
import compileExcludes from './compileExcludes.js';

type Compiler = 'webpack' | 'esbuild' | 'rspack';
interface TransformOptions {
  isServer: boolean;
}

const { createUnplugin } = unplugin;
function getPluginTransform(plugin: UnpluginOptions, transformOptions: TransformOptions) {
  const { transform } = plugin;
  if (transform) {
    return {
      // Add default enfoce pre, so it will excute before swc compilation.
      enforce: 'pre',
      ...plugin,
      transform(code: string, id: string) {
        return transform.call(this, code, id, transformOptions);
      },
    } as UnpluginOptions;
  }

  return plugin;
}

function transformInclude(id: string) {
  // Ingore binary file to be transformed.
  return !!id.match(/\.(js|jsx|ts|tsx|mjs|mts|css|less|scss)$/);
}

function getCompilerPlugins(rootDir: string, config: Config, compiler: 'rspack', transformOptions: TransformOptions): Config['plugins'];
function getCompilerPlugins(rootDir: string, config: Config, compiler: 'webpack', transformOptions: TransformOptions): Config['plugins'];
function getCompilerPlugins(rootDir: string, config: Config, compiler: 'esbuild', transformOptions: TransformOptions): BuildOptions['plugins'];
function getCompilerPlugins(rootDir: string, config: Config, compiler: Compiler, transformOptions: TransformOptions) {
  const {
    sourceMap,
    transformPlugins = [],
    transforms = [],
    mode,
    compileIncludes,
    swcOptions,
    redirectImports,
    fastRefresh,
    cacheDir,
    polyfill,
    enableEnv,
    getRoutesFile,
    serverComponent,
  } = config;
  const compilerPlugins = [];

  // Add custom transform before swc compilation so the source code can be got before transformed.
  compilerPlugins.push(
    ...(transformPlugins.filter(({ enforce }) => !enforce || enforce === 'pre') || []),
    ...transforms.map((transform, index) => ({ name: `transform_${index}`, transform, transformInclude })),
  );
  const clientBundlers = ['webpack', 'rspack'];
  // Use webpack loader instead of webpack plugin to do the compilation.
  // Reason: https://github.com/unjs/unplugin/issues/154
  if (swcOptions && !clientBundlers.includes(compiler)) {
    compilerPlugins.push(compilationPlugin({
      rootDir,
      cacheDir,
      sourceMap,
      fastRefresh,
      mode,
      compileIncludes,
      compileExcludes,
      swcOptions,
      polyfill,
      enableEnv,
      getRoutesFile,
      serverComponent,
      isServer: true,
    }));
  }

  compilerPlugins.push(
    ...(transformPlugins.filter(({ enforce }) => enforce === 'post') || []),
  );

  // Add redirect import after compilationPlugin.
  if (redirectImports) {
    compilerPlugins.push(redirectImportPlugin({
      sourceMap,
      exportData: redirectImports,
    }));
  }
  if (clientBundlers.includes(compiler)) {
    return compilerPlugins
      .map((plugin) => createUnplugin(() => getPluginTransform(plugin, transformOptions))[compiler]()) as Config['plugins'];
  } else {
    return compilerPlugins.map(plugin => getPluginTransform(plugin, transformOptions));
  }
}

export default getCompilerPlugins;
