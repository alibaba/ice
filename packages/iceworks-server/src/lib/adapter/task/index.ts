import * as EventEmitter from 'events';
import * as execa from 'execa';
import chalk from 'chalk';
import { LINT_CONF } from './const';

export const DEV_STATUS_NORMAL = 'normal';
export const DEV_STATUS_WORKING = 'working';
export const DEV_STATUS_STOP = 'stop';

export default class Dev extends EventEmitter {
  public readonly path: string;

  public status: string = DEV_STATUS_NORMAL;

  private process;

  constructor(options) {
    super();
    this.path = options.path;
  }

  async start(settingsEnv) {
    this.status = DEV_STATUS_WORKING;

    if (this.process) {
      throw new Error(
        'The task has started. Please stop the task before trying again.'
      );
    }

    this.process = execa('npm', ['run', 'lint'], {
      cwd: this.path || process.cwd(),
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true,
      env: settingsEnv,
    });

    this.process.stdout.on('data', (buffer) => {
      this.emit('start.data', buffer.toString());
    });

    this.process.on('error', (buffer) => {
      console.log(buffer.toString());
    });

    return this;
  }

  async stop() {
    this.process.kill();
    this.status = DEV_STATUS_STOP;
    this.process.on('exit', () => {
      this.emit('stop.data', chalk.grey('Task has stopped'));
    });
    this.process = null;

    return this;
  }

  async setting() {
    return LINT_CONF;
  }
}
