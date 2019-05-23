import * as EventEmitter from 'events';
import * as detectPort from 'detect-port';
import * as execa from 'execa';
import chalk from 'chalk';
import * as ipc from './ipc';
import DEV_SETTINGS from './const';

const DEFAULT_PORT = '4444';

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

    // create an ipc channel
    ipc.init();

    const port = await detectPort(DEFAULT_PORT);
    const env = { PORT: port };

    if (this.process) {
      throw new Error(
        '调试服务已启动，不能多次启动，请先停止已启动的调试服务后再次启动'
      );
    }

    this.process = execa('npm', ['start'], {
      cwd: this.path || process.cwd(),
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true,
      env: Object.assign({}, env, settingsEnv),
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
      this.emit('stop.data', chalk.grey('Dev server stopped working'));
    });
    this.process = null;

    return this;
  }

  async getSettings() {
    return DEV_SETTINGS;
  }
}
