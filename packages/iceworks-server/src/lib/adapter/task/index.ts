import * as EventEmitter from 'events';
import * as execa from 'execa';
import * as detectPort from 'detect-port';
import chalk from 'chalk';
import * as ipc from './ipc';
import { DEV_CONF, BUILD_CONF, LINT_CONF } from './const';

const DEFAULT_PORT = '4444';
const TASK_STATUS_NORMAL = 'normal';
const TASK_STATUS_WORKING = 'working';
const TASK_STATUS_STOP = 'stop';

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
    let { command } = args;

    if (this.process[command]) {
      throw new Error(
        'The task has started. Please stop the task before trying again.'
      );
    }

    let env: object = {};
    if (command === 'dev') {
      // set port
      env = { PORT: await detectPort(DEFAULT_PORT) };

      // create an ipc channel
      ipc.init();
    }

    const eventName = `${command}.start.data`;
    this.status = TASK_STATUS_WORKING;
    this.process[command] = execa(
      'npm',
      ['run', command === 'dev' ? 'start' : command],
      {
        cwd: this.path || process.cwd(),
        stdio: ['inherit', 'pipe', 'pipe'],
        shell: true,
        env: Object.assign({}, process.env, env),
      }
    );

    this.process[command].stdout.on('data', (buffer) => {
      console.log(buffer.toString());
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

    if (command === 'dev') {
      return DEV_CONF;
    }

    if (command === 'build') {
      return BUILD_CONF;
    }

    if (command === 'lint') {
      return LINT_CONF;
    }
  }
}
