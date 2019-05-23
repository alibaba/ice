import * as EventEmitter from 'events';
import * as path from 'path';
import * as fsExtra from 'fs-extra';
import * as util from 'util';
import * as rimraf from 'rimraf';
import * as latestVersion from 'latest-version';

import { exec, spawn } from 'child_process';
import { IDependency, IProject, ICreateDependencyParam } from '../../../interface';

const rimrafAsync = util.promisify(rimraf);

export const install = async (dependency: ICreateDependencyParam): Promise<IDependency> => {
  return null;
};

export interface INpmOutdatedData { package: string; current: string; wanted: string; latest: string; location: string; };

export default class Dependency extends EventEmitter {
  public readonly projectPath: string;

  public readonly projectPackageJSON: any;

  public readonly processEnv: any;

  public readonly path: string;

  constructor(project: IProject) {
    super();
    this.projectPath = project.path;
    this.projectPackageJSON = project.packageJSON;
    this.processEnv = project.processEnv;
    this.path = path.join(this.projectPath, 'node_modules');
  }

  private async getLocalVersion(name: string): Promise<string> {
    const pkgPath = path.join(this.path, name, 'package.json');
    const verstion: string = (await fsExtra.readJson(pkgPath)).version;
    return verstion;
  };

  // TODO any other way?
  private async getNpmOutdated(): Promise<INpmOutdatedData[]> {
    return new Promise((resolve) => {
      exec('npm outdated --json --silent', { cwd: this.projectPath, env: this.processEnv }, (error, stdout) => {
        let npmOutdated = [];
        try {
          npmOutdated = JSON.parse(stdout);
        } catch (error) {
          // log it
        }

        resolve(Object.entries(npmOutdated).map(([key, value]: [string, { current: string; wanted: string; latest: string; location: string; }]) => ({ package: key, ...value })));
      });
    });
  }

  public async create(dependency: ICreateDependencyParam): Promise<IDependency> {
    return await install(dependency);
  }

  public async creates(dependencies: ICreateDependencyParam[]): Promise<IDependency[]> {
    return [];
  }

  public async getAll(): Promise<{ dependencies: IDependency[], devDependencies: IDependency[] }> {
    const { dependencies: packageDependencies, devDependencies: packageDevDependencies } = this.projectPackageJSON;

    const getAll = async (list, dev) => {
      return await Promise.all(Object.entries(list).map(async ([_package, specifyVersion]: [string, string]) => {
        let localVersion = '';
        try {
          localVersion = await this.getLocalVersion(_package);
        } catch (error) {
          // ignore error
        }
        return {
          package: _package,
          specifyVersion,
          dev,
          localVersion,
          latestVersion: await latestVersion(_package)
        }
      }));
    }

    let dependencies: IDependency[] = [];
    if (packageDependencies) {
      dependencies = await getAll(packageDependencies, false);
    }

    let devDependencies: IDependency[] = [];
    if (packageDevDependencies) {
      devDependencies = await getAll(packageDevDependencies, true);
    }

    const npmOutdated: INpmOutdatedData[] = await this.getNpmOutdated();
    npmOutdated.forEach(({ package: _outPackage, wanted }: INpmOutdatedData) => {
      const dependency = dependencies.find(({ package: _package }) => _package === _outPackage);
      if (dependency && dependency.localVersion) {
        dependency.wantedVestion = wanted;
      }

      const devDependency = devDependencies.find(({ package: _package }) => _package === _outPackage);
      if (devDependency && devDependency.localVersion) {
        devDependency.wantedVestion = wanted;
      }
    });

    return {
      dependencies,
      devDependencies
    };
  }

  public async reset() {
    this.emit('data', '正在清理 node_modules 目录，请稍等');

    await rimrafAsync(this.path);

    this.emit('data', '清理 node_modules 目录完成');

    this.emit('data', '开始安装依赖...');

    const childProcess = spawn('npm', ['install'], {
      cwd: this.projectPath,
      env: this.processEnv,
    });

    childProcess.stdout.on('data', (buffer) => {
      const text = buffer.toString();
      console.log('data:', text);

      this.emit('data', text);
    });

    childProcess.on('error', (buffer) => {
      console.log('error:', buffer.toString());
    });

    childProcess.on('exit', (code, signal) => {
      console.log('exit:', code, signal);

      this.emit('exit', code);
    });
  }
}
