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
  private compilerOptions: Parameters<ServerCompiler>[1];
  public buildResult: ServerBuildResult;

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
      if (compilation) {
        // Option of compilationInfo need to be object, while it may changed during multi-time compilation.
        // todo: 多个 task 的情况，如何处理多个 manifest
        this.compilerOptions.compilationInfo.assetsManifest = JSON.parse(
          compilation.getAsset('assets-manifest.json').source.source().toString(),
        );
      }
      // For first time, we create a new task.
      // The next time, we use incremental build so do not create task again.
      if (!this.task) {
        this.task = this.serverCompiler(buildOptions, this.compilerOptions);
        this.task.then((buildResult) => {
          this.buildResult = buildResult;
          if (this.buildResult.error) {
            this.task = null;
          }
        });
      }
    }
  };

  public apply(compiler: Compiler) {
    compiler.hooks.watchRun.tap(pluginName, () => {
      this.isCompiling = true;
    });
    compiler.hooks.emit.tapPromise(pluginName, async (compilation: Compilation) => {
      this.isCompiling = false;
      await this.compileTask(compilation);

      const compilerTask = this.buildResult?.context.rebuild
        ? this.buildResult.context
            .rebuild()
            .then((result) => {
              return {
                // Pass original buildResult, because it's returned serverEntry.
                ...this.buildResult,
                result,
              };
            })
            .catch(({ errors }) => {
              return { error: errors };
            })
        : this.task;
      if (this.serverCompileTask) {
        this.serverCompileTask.set(compilerTask, this.compilerOptions.name);
      } else {
        return compilerTask;
      }
    });
  }
}
