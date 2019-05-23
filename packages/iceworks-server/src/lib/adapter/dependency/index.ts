import * as EventEmitter from 'events';
import * as path from 'path';
import * as fsExtra from 'fs-extra';
import * as util from 'util';
import * as rimraf from 'rimraf';
import * as latestVersion from 'latest-version';

import { exec, spawn } from 'child_process';
import { IDependency, IProject, ICreateDependencyParam, IDependencyModule, IBaseModule } from '../../../interface';

const rimrafAsync = util.promisify(rimraf);

export const install = async (dependencies: ICreateDependencyParam[], adapterModule: IBaseModule, isDev?: boolean): Promise<void> => {
  adapterModule.emit('install.data', '开始安装依赖');

  const args = ['install', '--no-package-lock', isDev ? '---save-dev' : '--save'].concat(
    dependencies.map(({ package: _package, version }) => `${_package}@${version}`)
  );

  const childProcess = spawn(
    'npm',
    args,
    {
      cwd: adapterModule.project.path,
      env: adapterModule.project.getEnv(),
    }
  );

  childProcess.stdout.on('data', (buffer) => {
    const text = buffer.toString();
    console.log('install.data:', text);

    adapterModule.emit('install.data', text);
  });

  childProcess.on('error', (buffer) => {
    console.log('install.error:', buffer.toString());
  });

  childProcess.on('exit', (code, signal) => {
    console.log('install.exit:', code, signal);

    adapterModule.emit('install.exit', code);
  });
};

export interface INpmOutdatedData { package: string; current: string; wanted: string; latest: string; location: string; };

export default class Dependency extends EventEmitter implements IDependencyModule {
  public project: IProject;

  public readonly path: string;

  constructor(project: IProject) {
    super();
    this.project = project;
    this.path = path.join(this.project.path, 'node_modules');
  }

  private async getLocalVersion(name: string): Promise<string> {
    const pkgPath = path.join(this.path, name, 'package.json');
    const verstion: string = (await fsExtra.readJson(pkgPath)).version;
    return verstion;
  };

  // TODO any other way?
  private async getNpmOutdated(): Promise<INpmOutdatedData[]> {
    return new Promise((resolve) => {
      exec('npm outdated --json --silent', { cwd: this.project.path, env: this.project.getEnv() }, (error, stdout) => {
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

  public async create(dependency: ICreateDependencyParam, idDev?: boolean): Promise<void> {
    return (await install([dependency], this, idDev))[0];
  }

  public async creates(dependencies: ICreateDependencyParam[], idDev?: boolean): Promise<void> {
    return await install(dependencies, this, idDev);
  }

  public async getAll(): Promise<{ dependencies: IDependency[], devDependencies: IDependency[] }> {
    const { dependencies: packageDependencies, devDependencies: packageDevDependencies } = this.project.getPackageJSON();

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
      if (dependency && dependency.localVersion && dependency.localVersion !== wanted) {
        dependency.wantedVestion = wanted;
      }

      const devDependency = devDependencies.find(({ package: _package }) => _package === _outPackage);
      if (devDependency && devDependency.localVersion && devDependency.localVersion !== wanted) {
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
      cwd: this.project.path,
      env: this.project.getEnv(),
    });

    childProcess.stdout.on('data', (buffer) => {
      const text = buffer.toString();
      console.log('reset.data:', text);

      this.emit('reset.data', text);
    });

    childProcess.on('error', (buffer) => {
      console.log('reset.error:', buffer.toString());
    });

    childProcess.on('exit', (code, signal) => {
      console.log('reset.exit:', code, signal);

      this.emit('reset.exit', code);
    });
  }

  public async upgrade(denpendency: { package: string; isDev?: boolean }): Promise<void> {
    const { package: _package } = denpendency;

    this.emit('data', `开始更新依赖：${_package}...`);

    const childProcess = spawn('npm', ['update', _package, '--silent'], {
      cwd: this.project.path,
      env: this.project.getEnv(),
    });

    childProcess.stdout.on('data', (buffer) => {
      const text = buffer.toString();
      console.log('upgrade.data:', text);

      this.emit('upgrade.data', text);
    });

    childProcess.on('error', (buffer) => {
      console.log('upgrade.error:', buffer.toString());
    });

    childProcess.on('exit', (code, signal) => {
      console.log('upgrade.exit:', code, signal);

      this.emit('upgrade.exit', code);
    });
  };
}
