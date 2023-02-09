import type { Compiler, Compilation } from 'webpack';
import type ServerRunner from '../serverRunner.js';
import type ServerCompileTask from '../utils/ServerCompileTask.js';

const pluginName = 'ServerRunnerPlugin';

type ServerTask = ServerCompileTask<Promise<void>>;

/**
 * After compilation, compile the server entry.
 */
export default class ServerRunnerPlugin {
  private ensureRoutesConfig: () => Promise<void>;
  private isCompiling: boolean;
  private serverRunner: ServerRunner;
  private serverTask: ServerTask;

  public constructor(
    serverRunner: ServerRunner,
    ensureRoutesConfig: () => Promise<void>,
    serverTask: ServerTask,
  ) {
    this.serverRunner = serverRunner;
    this.ensureRoutesConfig = ensureRoutesConfig;
    this.serverTask = serverTask;
  }

  public compileTask = async (compilation?: Compilation) => {
    if (!this.isCompiling) {
      await this.ensureRoutesConfig();
      if (compilation) {
        // Option of compilationInfo need to be object, while it may changed during multi-time compilation.
        this.serverRunner.addCompileData({
          assetsManifest: JSON.parse(compilation.assets['assets-manifest.json'].source().toString()),
        });
      }
    }
  };

  public apply(compiler: Compiler) {
    compiler.hooks.watchRun.tap(pluginName, () => {
      this.isCompiling = true;
    });
    compiler.hooks.emit.tap(pluginName, (compilation: Compilation) => {
      this.isCompiling = false;
      const task = this.compileTask(compilation);
      this.serverTask.set(task);
    });
  }
}
