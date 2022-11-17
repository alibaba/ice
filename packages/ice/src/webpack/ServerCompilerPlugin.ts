import type { Compiler, Compilation } from 'webpack';
import type { ExtendsPluginAPI, ServerCompiler } from '../types/plugin.js';

const pluginName = 'ServerCompilerPlugin';

/**
 * After compilation, compile the server entry.
 */
export default class ServerCompilerPlugin {
  private serverCompiler: ServerCompiler;
  private serverCompilerOptions: Parameters<ServerCompiler>;
  private serverCompileTask: ExtendsPluginAPI['serverCompileTask'];
  private ensureRoutesConfig: () => Promise<void>;
  private isCompiling: boolean;
  private lastAssets: string;

  public constructor(
    serverCompiler: ServerCompiler,
    serverCompilerOptions: Parameters<ServerCompiler>,
    ensureRoutesConfig: () => Promise<void>,
    serverCompileTask?: ExtendsPluginAPI['serverCompileTask'],
  ) {
    this.serverCompiler = serverCompiler;
    this.serverCompilerOptions = serverCompilerOptions;
    this.serverCompileTask = serverCompileTask;
    this.ensureRoutesConfig = ensureRoutesConfig;
  }

  public compileTask = async (compilation?: Compilation) => {
    const [buildOptions, customConfig = {}] = this.serverCompilerOptions;
      let task = null;
      if (!this.isCompiling) {
        await this.ensureRoutesConfig();
        let assets = this.lastAssets;
        if (compilation) {
          assets = compilation.assets['assets-manifest.json'].source().toString();
          // Store last assets for compilation Document.
          this.lastAssets = assets;
        }
        task = this.serverCompiler(buildOptions, {
          ...customConfig,
          assetsManifest: JSON.parse(assets),
        });
      }
      return task;
  };

  public apply(compiler: Compiler) {
    compiler.hooks.watchRun.tap(pluginName, () => {
      this.isCompiling = true;
    });
    compiler.hooks.emit.tapPromise(pluginName, async (compilation: Compilation) => {
      this.isCompiling = false;
      const task = await this.compileTask(compilation);
      if (this.serverCompileTask) {
        this.serverCompileTask.set(task);
      } else {
        return task;
      }
    });
  }
}
