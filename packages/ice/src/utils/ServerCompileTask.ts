import type { ServerCompiler } from '../types/plugin.js';

/**
 * Get server compile promise task in middlewares or plugins.
 */
class ServerCompileTask<T = ReturnType<ServerCompiler>> {
  private task: T;
  private taskMap: Map<string, T> = new Map();

  set(task: T, name?: string) {
    this.task = task;

    if (name) {
      this.taskMap.set(name, task);
    }
  }

  public get(name?: string): T {
    if (name && this.taskMap.has(name)) {
      return this.taskMap.get(name);
    }

    return this.task;
  }
}

export default ServerCompileTask;
