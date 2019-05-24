import * as EventEmitter from 'events';
import * as execa from 'execa';
import chalk from 'chalk';
import { LINT_CONF, BUILD_CONF } from './const';

export const TASK_STATUS_NORMAL = 'normal';
export const TASK_STATUS_WORKING = 'working';
export const TASK_STATUS_STOP = 'stop';

export default class Task extends EventEmitter {
  public readonly path: string;

  public status: string = TASK_STATUS_NORMAL;

  private process: object = {};

  constructor(options) {
    super();
    this.path = options.path;
  }

  /**
   * run start task
   * @param args
   */
  async start(args) {
    const { command } = args;
    const eventName = `${command}.start.data`;

    this.status = TASK_STATUS_WORKING;

    if (this.process[command]) {
      throw new Error(
        'The task has started. Please stop the task before trying again.'
      );
    }

    this.process[command] = execa('npm', ['run', command], {
      cwd: this.path || process.cwd(),
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true,
    });

    this.process[command].stdout.on('data', (buffer) => {
      this.emit(eventName, buffer.toString());
    });

    this.process[command].on('error', (buffer) => {
      throw new Error(buffer.toString());
    });

    return this;
  }

  /**
   * run stop task
   * @param args
   */
  async stop(args) {
    const { command } = args;
    const eventName = `${command}.stop.data`;

    this.process[command].kill();
    this.status = TASK_STATUS_STOP;
    this.process[command].on('exit', () => {
      this.emit(eventName, chalk.grey('Task has stopped'));
    });
    this.process[command] = null;

    return this;
  }

  /**
   * get the conf of the current task
   * @param args
   */
  async setting(args) {
    const { command } = args;

    if (command === 'lint') {
      return LINT_CONF;
    }

    if (command === 'build') {
      return BUILD_CONF;
    }
  }
}
