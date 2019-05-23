import * as EventEmitter from 'events';
import * as execa from 'execa';
import chalk from 'chalk';

export const BUILD_STATUS_NORMAL = 'normal';
export const BUILD_STATUS_WORKING = 'working';
export const BUILD_STATUS_STOP = 'stop';

export default class Build extends EventEmitter {
  public readonly path: string;

  public status: string = BUILD_STATUS_NORMAL;

  private process;

  constructor(options) {
    super();
    this.path = options.path;
  }

  async start(settingsEnv) {
    this.status = BUILD_STATUS_WORKING;

    // TODO: yarn support
    this.process = execa('npm', ['run', 'build'], {
      cwd: this.path || process.cwd(),
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true,
      env: Object.assign({}, settingsEnv),
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
    this.status = BUILD_STATUS_STOP;
    this.process.on('exit', () => {
      this.emit('stop.data', chalk.grey('Build has stopped'));
    });
    this.process = null;

    return this;
  }
}
