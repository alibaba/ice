import type { ServerCompiler } from '@ice/types/esm/plugin.js';

/**
 * Get server compile promise task in middlewares or plugins.
 */
class ServerCompileTask {
  private task: ReturnType<ServerCompiler>;

  set(task: ReturnType<ServerCompiler>) {
    this.task = task;
  }

  public async get() {
    return this.task;
  }
}

export default ServerCompileTask;
