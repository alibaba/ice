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
  public buildResult: ServerBuildResult & { assetsManifestChanged?: boolean };

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
      let assetsManifestChanged = false;
      if (compilation) {
        // Option of compilationInfo need to be object, while it may changed during multi-time compilation.
        const newAssetsManifest = JSON.parse(compilation.getAsset('assets-manifest.json').source.source().toString());
        const oldAssetsManifest = this.compilerOptions.compilationInfo.assetsManifest;

        // Check if assets manifest has changed
        if (JSON.stringify(oldAssetsManifest) !== JSON.stringify(newAssetsManifest)) {
          assetsManifestChanged = true;
          this.compilerOptions.compilationInfo.assetsManifest = newAssetsManifest;
        }
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
      } else if (assetsManifestChanged && this.buildResult?.context?.rebuild) {
        // Force rebuild when assets manifest changes
        this.buildResult.assetsManifestChanged = true;
      }
    }
  };

  public apply(compiler: Compiler) {
    compiler.hooks.watchRun.tap(pluginName, () => {
      this.isCompiling = true;
    });
    // @ts-expect-error webpack hooks type not match.
    compiler.hooks.emit.tapPromise(pluginName, async (compilation: Compilation) => {
      this.isCompiling = false;
      await this.compileTask(compilation);

      let compilerTask: Promise<ServerBuildResult>;
      if (this.buildResult?.context.rebuild && !this.buildResult?.assetsManifestChanged) {
        compilerTask = this.buildResult.context.rebuild()
          .then((result) => {
            return {
              // Pass original buildResult, because it's returned serverEntry.
              ...this.buildResult,
              result,
            };
          })
          .catch(({ errors }) => {
            return { error: errors };
          });
      } else if (this.buildResult?.assetsManifestChanged) {
        compilerTask = (async () => {
          // When assets manifest changes, force full rebuild to get fresh document
          this.buildResult.assetsManifestChanged = false;
          this.task = this.serverCompiler(this.serverCompilerOptions[0], this.compilerOptions);
          const newBuildResult = await this.task;
          this.buildResult = newBuildResult;
          return newBuildResult;
        })();
      } else {
        compilerTask = this.task;
      }

      if (this.serverCompileTask) {
        this.serverCompileTask.set(compilerTask);
      } else {
        return compilerTask;
      }
    });
  }
}
