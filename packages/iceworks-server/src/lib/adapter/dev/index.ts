import * as EventEmitter from 'events';
import * as detectPort from 'detect-port';
import * as execa from 'execa';
import * as ipc from './ipc';
import DEV_SETTINGS from './const';

const DEFAULT_PORT = '4445';

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
    // create an ipc channel
    ipc.init();
    const port = await detectPort(DEFAULT_PORT);
    const env = { PORT: port };

    if (this.process) {
      throw new Error(
        '调试服务已启动，不能多次启动，请先停止已启动的调试服务后再次启动'
      );
    }

    const childProcess = execa('npm', ['start'], {
      cwd: this.path || process.cwd(),
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true,
      env: Object.assign({}, env, settingsEnv),
    });

    this.status = DEV_STATUS_WORKING;
    this.process = childProcess;

    childProcess.stdout.on('data', (buffer) => {
      this.emit('data', buffer.toString());
    });

    childProcess.on('error', (buffer) => {
      console.log(buffer.toString());
    });

    childProcess.on('exit', (code) => {
      console.log('process exit:', code);
    });

    return { status: this.status };
  }

  async stop() {
    if (!this.process) {
      throw new Error('没有启动调试服务，无法停止。');
    }

    this.process.kill();
    this.process = null;
    this.status = DEV_STATUS_STOP;

    return { status: this.status };
  }

  async getSettings() {
    return DEV_SETTINGS;
  }
}
