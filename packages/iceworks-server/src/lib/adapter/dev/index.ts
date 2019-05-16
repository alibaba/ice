import * as EventEmitter from 'events';
import * as detectPort from 'detect-port';
import * as execa from 'execa';
import DEV_SETTINGS from './const';

const DEFAULT_PORT = '4445';

export const DEV_STATUS_NORMAL = 'normal';
export const DEV_STATUS_STARING = 'staring';
export const DEV_STATUS_WORKING = 'working';
export const DEV_STATUS_STOP = 'stop';

export default class Dev extends EventEmitter {
  public readonly path: string;

  public devStatus: string = DEV_STATUS_NORMAL;

  private devProcess;

  constructor(options) {
    super();
    this.path = options.path;
  }

  async start(settingsEnv) {
    const port = await detectPort(DEFAULT_PORT);
    const env = { PORT: port };

    if (this.devProcess) {
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

    this.devStatus = DEV_STATUS_WORKING;
    this.devProcess = childProcess;

    childProcess.stdout.on('data', (buffer) => {
      this.emit('dev.data', buffer.toString());
    });

    childProcess.on('error', (buffer) => {
      console.log(buffer.toString());
    });

    childProcess.on('exit', (code) => {
      console.log('process exit:', code);
    });

    return this;
  }

  async getSettings() {
    return DEV_SETTINGS;
  }
}
