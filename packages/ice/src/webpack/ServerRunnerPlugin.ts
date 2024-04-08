import type { Compiler, Compilation } from 'webpack';
import type ServerRunner from '../service/ServerRunner.js';

/**
 * Get assets manifest from serevr runner.
 */
export default class ServerRunnerPlugin {
  private ensureRoutesConfig: () => Promise<void>;
  private isCompiling: boolean;
  private serverRunner: ServerRunner;

  public constructor(
    serverRunner: ServerRunner,
    ensureRoutesConfig: () => Promise<void>,
  ) {
    this.serverRunner = serverRunner;
    this.ensureRoutesConfig = ensureRoutesConfig;
  }

  public compileTask = async (compilation?: Compilation) => {
    if (!this.isCompiling) {
      if (compilation) {
        // Option of compilationInfo need to be object, while it may changed during multi-time compilation.
        this.serverRunner.addCompileData({
          assetsManifest: JSON.parse(compilation.assets['assets-manifest.json'].source().toString()),
        });
      }
    }
  };

  public apply(compiler: Compiler) {
    compiler.hooks.watchRun.tap(this.constructor.name, () => {
      this.isCompiling = true;
    });
    compiler.hooks.emit.tapPromise(this.constructor.name, async (compilation: Compilation) => {
      this.isCompiling = false;
      return this.compileTask(compilation);
    });
  }
}
