import * as path from 'path';
import * as pathExists from 'path-exists';
import * as fs from 'fs';
import junk from 'junk';
import * as util from 'util';
import * as child_process from 'child_process';
import * as detectPort from 'detect-port';
import * as EventEmitter from 'events';
import { IProjectPage, IProjectDependency } from '../../interface';
const readdirAsync = util.promisify(fs.readdir);

const readdir = async (targetPath) => {
  if (pathExists.sync(targetPath)) {
    return (await readdirAsync(targetPath)).filter(junk.not);
  }
  return [];
};

const recursive = async function(dirPath) {
  const list = [];
  const files = await readdir(dirPath);
  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    const stats = fs.lstatSync(fullPath);
    if (stats.isDirectory()) {
      const { atime, birthtime, ctime, mtime } = stats;
      list.push({
        name: path.basename(fullPath),
        fullPath,
        atime,
        birthtime,
        ctime,
        mtime,
      });
    }
  });

  return list;
};

const DEFAULT_PORT = '4444';

export const DEV_STATUS_NORMAL = 'normal';
export const DEV_STATUS_STARING = 'staring';
export const DEV_STATUS_WORKING = 'working';
export const DEV_STATUS_STOP = 'stop';

export default class Project extends EventEmitter {
  public readonly name: string;

  public readonly folderPath: string;

  private devProcess: child_process.ChildProcess;

  public devStatus: string = DEV_STATUS_NORMAL;

  constructor(folderPath: string) {
    super();
    this.name = path.basename(folderPath);
    this.folderPath = folderPath;
  }

  async getPages(): Promise<IProjectPage[]> {
    return recursive(path.join(this.folderPath, 'src', 'pages'));
  }

  async getDependencies(): Promise<IProjectDependency[]> {
    return [
      {
        package: 'icestore',
        dev. false,
        specifyVersion: '^0.1.0'
      }
    ];
  }

  async devStart(settingsEnv: object): Promise<Project> {
    const port = await detectPort(DEFAULT_PORT);
    const { folderPath } = this;
    const env = { PORT: port };

    if (this.devProcess) {
      throw new Error('调试服务已启动，不能多次启动，请先停止已启动的调试服务后再次启动');
    }

    const childProcess = child_process.spawn('npm', ['start'], {
      cwd: folderPath,
      env: Object.assign({}, settingsEnv, env)
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

  async devStop(): Promise<Project> {
    if (!this.devProcess) {
      throw new Error('没有启动调试服务，无法停止。');
    }

    this.devProcess.kill();
    this.devProcess = null;
    this.devStatus = DEV_STATUS_STOP;

    return this;
  }
}
