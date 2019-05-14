import * as EventEmitter from 'events';
import * as detectPort from 'detect-port';
import * as child_process from 'child_process';
import DEV_SETTINGS from './const';

const DEFAULT_PORT = '4444';

export const DEV_STATUS_NORMAL = 'normal';
export const DEV_STATUS_STARING = 'staring';
export const DEV_STATUS_WORKING = 'working';
export const DEV_STATUS_STOP = 'stop';

export default class Dev extends EventEmitter {
  public readonly projectPath: string;

  public devStatus: string = DEV_STATUS_NORMAL;

  private devProcess;

  constructor() {
    super();
  }

  async devStart(settingsEnv) {
    const port = await detectPort(DEFAULT_PORT);
    const { projectPath } = this;
    const env = { PORT: port };

    if (this.devProcess) {
      throw new Error(
        '调试服务已启动，不能多次启动，请先停止已启动的调试服务后再次启动'
      );
    }

    const childProcess = child_process.spawn('npm', ['start'], {
      cwd: projectPath,
      env: Object.assign({}, settingsEnv, env),
    });

    this.devStatus = DEV_STATUS_WORKING;
    this.devProcess = childProcess;

    childProcess.stdout.on('data', (data) => {
      this.emit('dev.data', data);
    });

    childProcess.on('error', (data) => {
      this.devStatus = DEV_STATUS_STOP;
      this.devProcess = null;
      this.emit('dev.error', data);
    });

    childProcess.on('exit', (code, signal) => {
      this.devStatus = DEV_STATUS_STOP;
      this.emit('dev.exit', code, signal);
    });

    return this;
  }

  async getDevSettings() {
    return DEV_SETTINGS;
  }
}
