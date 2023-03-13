import type { ServerCompiler } from '../types/plugin.js';

/**
 * Get server compile promise task in middlewares or plugins.
 */
class ServerCompileTask<T = ReturnType<ServerCompiler>> {
  private task: T;

  set(task: T) {
    this.task = task;
  }

  public get(): T {
    return this.task;
  }
}

export default ServerCompileTask;
