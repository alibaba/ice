import type { Compiler, Compilation } from 'webpack';
import type { ExtendsPluginAPI, ServerCompiler, ServerBuildResult } from '../types/plugin.js';

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
  private task: ReturnType<ServerCompiler>;
  private buildResult: ServerBuildResult;
  private compilerOptions: Parameters<ServerCompiler>[1];

  public constructor(
    serverCompiler: ServerCompiler,
    serverCompilerOptions: Parameters<ServerCompiler>,
    ensureRoutesConfig: () => Promise<void>,
    serverCompileTask?: ExtendsPluginAPI['serverCompileTask'],
  ) {
    this.serverCompiler = serverCompiler;
    this.serverCompilerOptions = serverCompilerOptions;
    const [, customConfig = {}] = this.serverCompilerOptions;
    this.serverCompileTask = serverCompileTask;
    this.ensureRoutesConfig = ensureRoutesConfig;
    this.compilerOptions = {
      ...customConfig,
      compilationInfo: {},
    };
  }

  public compileTask = async (compilation?: Compilation) => {
    const [buildOptions] = this.serverCompilerOptions;
    if (!this.isCompiling) {
      await this.ensureRoutesConfig();
      if (compilation) {
        // Option of compilationInfo need to be object, while it may changed during multi-time compilation.
        this.compilerOptions.compilationInfo.assetsManifest =
          JSON.parse(compilation.assets['assets-manifest.json'].source().toString());
      }

      if (!this.task) {
        this.task = this.serverCompiler({
          ...buildOptions,
          incremental: true,
        }, this.compilerOptions);
      }
      this.task.then((buildResult) => {
        this.buildResult = buildResult;
      });
    }
  };

  public apply(compiler: Compiler) {
    compiler.hooks.watchRun.tap(pluginName, () => {
      this.isCompiling = true;
    });
    compiler.hooks.emit.tapPromise(pluginName, async (compilation: Compilation) => {
      this.isCompiling = false;
      await this.compileTask(compilation);

      const compilerTask = this.buildResult ? this.buildResult.rebuild().then((result) => {
        return {
          // Pass original buildResult, becaues it's returned serverEntry.
          ...this.buildResult,
          result,
        };
      }) : this.task;
      if (this.serverCompileTask) {
        this.serverCompileTask.set(compilerTask);
      } else {
        return compilerTask;
      }
    });
  }
}
