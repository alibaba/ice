import * as path from 'path';
import * as pathExists from 'path-exists';
import * as fs from 'fs';
import junk from 'junk';
import * as util from 'util';
import * as child_process from 'child_process';
import * as detectPort from 'detect-port';
import * as EventEmitter from 'events';
import { IProjectPage, IProjectDependency } from '../../interface';
const originalReaddir = util.promisify(fs.readdir);

const readdir = async (targetPath) => {
  if (pathExists.sync(targetPath)) {
    return (await originalReaddir(targetPath)).filter(junk.not);
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

export default class Project {
  public readonly name: string;

  public readonly folderPath: string;

  constructor(folderPath: string) {
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
        dev: false,
        specifyingVersion: '^0.1.0'
      }
    ];
  }

  async startDev(setEnv: any): Promise<EventEmitter> {
    const event = new EventEmitter();
    const port = await detectPort(DEFAULT_PORT);
    const { folderPath } = this;
    const env = { PORT: port };

    const childProcess = child_process.spawn('npm', ['start'], { 
      cwd: folderPath,
      env: Object.assign({}, setEnv, env)
    });

    childProcess.stdout.on('data', (data) => {
      event.emit('data', data);
    });

    childProcess.on('error', (data) => {
      event.emit('error', data);
    });

    childProcess.on('exit', (code, signal) => {
      event.emit('exit', code, signal);
    });

    return event;
  }
}
