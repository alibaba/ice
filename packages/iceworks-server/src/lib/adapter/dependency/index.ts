import * as path from 'path';
import * as fsExtra from 'fs-extra';
import * as util from 'util';
import * as rimraf from 'rimraf';
import * as execa from 'execa';
import * as latestVersion from 'latest-version';

import { IDependency, IProject, ICreateDependencyParam, IDependencyModule, ISocket, IContext } from '../../../interface';

const rimrafAsync = util.promisify(rimraf);

export const install = async (
  dependencies: ICreateDependencyParam[], isDev: boolean, project: IProject, socket: ISocket, namespace: string
): Promise<void> => {
  console.log('dependencies', dependencies);
  socket.emit(`adapter.${namespace}.install.data`, '开始安装依赖');

  const args = ['install', '--no-package-lock', isDev ? '---save-dev' : '--save'].concat(
    dependencies.map(({ package: packageName, version }) => `${packageName}@${version}`)
  );

  const childProcess = execa(
    'npm',
    args,
    {
      cwd: project.path,
      env: project.getEnv(),
    }
  );

  childProcess.stdout.on('data', (buffer) => {
    const text = buffer.toString();
    console.log(`${namespace}.install.data:`, text);

    socket.emit(`adapter.${namespace}.install.data`, text);
  });

  childProcess.on('error', (buffer) => {
    console.log(`${namespace}.install.error:`, buffer.toString());
  });

  childProcess.on('exit', (code, signal) => {
    socket.emit(`adapter.${namespace}.install.exit`, code);
  });
};

export interface INpmOutdatedData { package: string; current: string; wanted: string; latest: string; location: string; }

export default class Dependency implements IDependencyModule {
  public project: IProject;
  public storage: any;

  public readonly path: string;

  constructor(params: {project: IProject; storage: any; }) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.path = path.join(this.project.path, 'node_modules');
  }

  private async getLocalVersion(name: string): Promise<string> {
    const pkgPath = path.join(this.path, name, 'package.json');
    const version: string = (await fsExtra.readJson(pkgPath)).version;
    return version;
  }

  // TODO any other way?
  private async getNpmOutdated(): Promise<INpmOutdatedData[]> {
    let npmOutdated = [];

    try {
      await execa('npm', ['outdated', '--json', '--silent'], { cwd: this.project.path, env: this.project.getEnv() });
    } catch (error) {
      // the process exit with 1 if got outdated
      npmOutdated = JSON.parse(error.stdout);
    }

    return Object.entries(npmOutdated).map(([key, value]: [string, { current: string; wanted: string; latest: string; location: string; }]) => ({ package: key, ...value }));
  }

  public async create(params: {dependency: ICreateDependencyParam, idDev?: boolean}, ctx: IContext): Promise<void> {
    const { dependency, idDev } = params;
    return (await install([dependency], idDev, this.project, ctx.socket, 'dependency'))[0];
  }

  public async bulkCreate(params: {dependencies: ICreateDependencyParam[], idDev?: boolean}, ctx: IContext): Promise<void> {
    const { dependencies, idDev } = params;
    return await install(dependencies, idDev, this.project, ctx.socket, 'dependency');
  }

  public async getAll(): Promise<{ dependencies: IDependency[], devDependencies: IDependency[] }> {
    const { dependencies: packageDependencies, devDependencies: packageDevDependencies } = this.project.getPackageJSON();

    const getAll = async (list, dev) => {
      return await Promise.all(Object.entries(list).map(async ([packageName, specifyVersion]: [string, string]) => {
        let localVersion = '';
        try {
          localVersion = await this.getLocalVersion(packageName);
        } catch (error) {
          // ignore error
        }
        return {
          package: packageName,
          specifyVersion,
          dev,
          localVersion,
          latestVersion: await latestVersion(packageName)
        };
      }));
    };

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
      const dependency = dependencies.find(({ package: packageName }) => packageName === _outPackage);
      if (dependency && dependency.localVersion && dependency.localVersion !== wanted) {
        dependency.wantedVestion = wanted;
      }

      const devDependency = devDependencies.find(({ package: packageName }) => packageName === _outPackage);
      if (devDependency && devDependency.localVersion && devDependency.localVersion !== wanted) {
        devDependency.wantedVestion = wanted;
      }
    });

    return {
      dependencies,
      devDependencies
    };
  }

  public async reset(arg: void, ctx: IContext) {
    ctx.socket.emit('adapter.dependency.reset.data', '正在清理 node_modules 目录，请稍等');

    await rimrafAsync(this.path);

    ctx.socket.emit('adapter.dependency.reset.data', '清理 node_modules 目录完成');

    ctx.socket.emit('adapter.dependency.reset.data', '开始安装依赖...');

    const childProcess = execa('npm', ['install'], {
      cwd: this.project.path,
      env: this.project.getEnv(),
    });

    childProcess.stdout.on('data', (buffer) => {
      const text = buffer.toString();
      console.log('reset.data:', text);

      ctx.socket.emit('adapter.dependency.reset.data', text);
    });

    childProcess.on('error', (buffer) => {
      console.log('reset.error:', buffer.toString());
    });

    childProcess.on('exit', (code, signal) => {
      console.log('reset.exit:', code, signal);

      ctx.socket.emit('adapter.dependency.reset.exit', code);
    });
  }

  public async upgrade(denpendency: { package: string; isDev?: boolean }, ctx: IContext): Promise<void> {
    const { package: packageName } = denpendency;

    ctx.socket.emit('adapter.dependency.upgrade.data', `开始更新依赖：${packageName}...`);

    const childProcess = execa('npm', ['update', packageName, '--silent'], {
      cwd: this.project.path,
      env: this.project.getEnv(),
    });

    childProcess.stdout.on('data', (buffer) => {
      const text = buffer.toString();
      console.log('upgrade.data:', text);

      ctx.socket.emit('adapter.dependency.upgrade.data', text);
    });

    childProcess.on('error', (buffer) => {
      console.log('upgrade.error:', buffer.toString());
    });

    childProcess.on('exit', (code, signal) => {
      console.log('upgrade.exit:', code, signal);

      ctx.socket.emit('adapter.dependency.upgrade.exit', code);
    });
  }
}
