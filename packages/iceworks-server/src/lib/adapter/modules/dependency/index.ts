import * as path from 'path';
import * as fsExtra from 'fs-extra';
import * as util from 'util';
import * as rimraf from 'rimraf';
import * as execa from 'execa';
// import * as latestVersion from 'latest-version';
import getNpmClient from '../../../getNpmClient';

import { IDependency, IProject, ICreateDependencyParam, IDependencyModule, IContext } from '../../../../interface';

const rimrafAsync = util.promisify(rimraf);

export const install = async (
  params: {
    dependencies: ICreateDependencyParam[];
    npmClient: string;
    registry: string;
    isDev: boolean;
    project: IProject;
    namespace: string;
    ctx: IContext;
  }
): Promise<void> => {
  const { dependencies, npmClient, registry, isDev, project, namespace, ctx } = params;
  const { socket, i18n, logger } = ctx;
  logger.info('dependencies', dependencies);
  socket.emit(`adapter.${namespace}.install.data`, { chunk: i18n.format('baseAdapter.dependency.reset.startInstall') });

  const args = ['install', '--loglevel', 'silly', '--no-package-lock', isDev ? '---save-dev' : '--save']
    .concat(dependencies.map(({ package: packageName, version }) => `${packageName}@${version}`))
    .concat(registry ? ['--registry', registry] : []);

  const childProcess = execa(
    npmClient,
    args,
    {
      cwd: project.path,
      env: project.getEnv(),
      stdio: ['inherit', 'pipe', 'pipe'],
    }
  );

  const listenFunc = (buffer) => {
    const chunk = buffer.toString();
    logger.info(`${namespace}.install.data:`, chunk);

    socket.emit(`adapter.${namespace}.install.data`, {
      chunk,
      isStdout: true,
    });
  };

  childProcess.stdout.on('data', listenFunc);

  childProcess.stderr.on('data', listenFunc);

  childProcess.on('error', (buffer) => {
    listenFunc(buffer);
    logger.info(`${namespace}.install.error:`, buffer.toString());
  });

  childProcess.on('exit', (code) => {
    socket.emit(`adapter.${namespace}.install.exit`, code);
  });
};

export interface INpmOutdatedData { package: string; current: string; wanted: string; latest: string; location: string }

export default class Dependency implements IDependencyModule {
  public project: IProject;

  public storage: any;

  public readonly path: string;

  constructor(params: {project: IProject; storage: any }) {
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

  private async getNpmOutdated(): Promise<INpmOutdatedData[]> {
    let npmOutdated = [];

    try {
      const [npmClient, registry] = await getNpmClient();
      const args = ['outdated', '--json'].concat(registry ? ['--registry', registry] : []);
      await execa(npmClient, args, { cwd: this.project.path, env: this.project.getEnv() });
    } catch (error) {
      if (error.errno) {
        throw error;
      } else if (error.stdout) {
        // the process exit with 1 if got outdated
        npmOutdated = JSON.parse(error.stdout);
      }
    }

    return Object.entries(npmOutdated).map(([key, value]: [string, { current: string; wanted: string; latest: string; location: string }]) => ({ package: key, ...value }));
  }

  public async create(params: {dependency: ICreateDependencyParam; isDev?: boolean}, ctx: IContext): Promise<void> {
    const { dependency, isDev } = params;
    const [npmClient, registry] = await getNpmClient();
    return (await install({
      dependencies: [dependency],
      npmClient,
      registry,
      isDev,
      project: this.project,
      namespace: 'dependency',
      ctx,
    }))[0];
  }

  public async bulkCreate(params: {dependencies: ICreateDependencyParam[]; isDev?: boolean}, ctx: IContext): Promise<void> {
    const { dependencies, isDev } = params;
    const [npmClient, registry] = await getNpmClient();
    return await install({
      dependencies,
      npmClient,
      registry,
      isDev,
      project: this.project,
      namespace: 'dependency',
      ctx,
    });
  }

  public async getAll(): Promise<{ dependencies: IDependency[]; devDependencies: IDependency[] }> {
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

          // TODO get latestVersion is so slow, so we disable it now
          // latestVersion: await latestVersion(packageName),
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

    // TODO getNpmOutdated is so slow, so we disable it now
    const npmOutdated: INpmOutdatedData[] = []; // await this.getNpmOutdated();
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
      devDependencies,
    };
  }

  public async reset(arg: void, ctx: IContext) {
    const { socket, i18n, logger } = ctx;

    socket.emit('adapter.dependency.reset.data', { chunk: i18n.format('baseAdapter.dependency.reset.clearWait') });

    await rimrafAsync(this.path);

    socket.emit('adapter.dependency.reset.data', { chunk: i18n.format('baseAdapter.dependency.reset.clearDone') });

    socket.emit('adapter.dependency.reset.data', { chunk: i18n.format('baseAdapter.dependency.reset.startInstall') });

    const [npmClient, registry] = await getNpmClient();
    const args = ['install', '--loglevel', 'silly'].concat(registry ? ['--registry', registry] : []);
    const childProcess = execa(npmClient, args, {
      cwd: this.project.path,
      env: this.project.getEnv(),
      stdio: ['inherit', 'pipe', 'pipe'],
    });

    const listenFunc = (buffer) => {
      const chunk = buffer.toString();
      socket.emit('adapter.dependency.reset.data', {
        chunk,
        isStdout: true,
      });
    };

    childProcess.stdout.on('data', listenFunc);

    childProcess.stderr.on('data', listenFunc);

    childProcess.on('error', (buffer) => {
      listenFunc(buffer);
      logger.info('reset.error:', buffer.toString());
    });

    childProcess.on('exit', (code, signal) => {
      logger.info('reset.exit:', code, signal);

      socket.emit('adapter.dependency.reset.exit', code);
    });
  }

  public async upgrade(denpendency: { package: string; isDev?: boolean }, ctx: IContext): Promise<void> {
    const { package: packageName } = denpendency;
    const { socket, i18n, logger } = ctx;

    socket.emit('adapter.dependency.upgrade.data', { chunk: i18n.format('baseAdapter.dependency.reset.startInstall', {packageName}) });

    const [npmClient, registry] = await getNpmClient();
    const args = ['update', packageName, '--loglevel', 'silly'].concat(registry ? ['--registry', registry] : []);
    const childProcess = execa(npmClient, args, {
      cwd: this.project.path,
      env: this.project.getEnv(),
      stdio: ['inherit', 'pipe', 'pipe'],
    });

    const listenFunc = (buffer) => {
      const chunk = buffer.toString();
      logger.info('upgrade.data:', chunk);

      socket.emit('adapter.dependency.upgrade.data', {
        chunk,
        isStdout: true,
      });
    };

    childProcess.stdout.on('data', listenFunc);

    childProcess.stderr.on('data', listenFunc);

    childProcess.on('error', (buffer) => {
      listenFunc(buffer);
      logger.info('upgrade.error:', buffer.toString());
    });

    childProcess.on('exit', (code, signal) => {
      logger.info('upgrade.exit:', code, signal);

      socket.emit('adapter.dependency.upgrade.exit', code);
    });
  }
}
