import * as EventEmitter from 'events';
import * as path from 'path';
import * as pathExists from 'path-exists';
import * as fsExtra from 'fs-extra';
import { exec } from 'child_process';
import { IDependency, IProject } from '../../../interface';

export const install = async (dependency: IDependency): Promise<IDependency> => {
  return dependency;
};

export interface INpmOutdatedData { package: string; current: string; wanted: string; latest: string; location: string; };

export default class Dependency extends EventEmitter {
  public readonly projectPath: string;

  public readonly projectPackageJSON: any;

  public readonly processEnv: any;

  constructor(project: IProject) {
    super();
    this.projectPath = project.path;
    this.projectPackageJSON = project.packageJSON;
    this.processEnv = project.processEnv;
  }

  private async getLocalVersion(name: string): Promise<string> {
    const pkgPath = path.join(this.projectPath, 'node_modules', name, 'package.json');
    let verstion: string = '-';
    const packageIsExist = await pathExists(pkgPath);
    if (packageIsExist) {
      try {
        verstion = (await fsExtra.readJson(pkgPath)).version;
      } catch (e) {
        // ....
      }
    }
    return verstion;
  };

  public async create(dependency: IDependency): Promise<IDependency> {
    return await install(dependency);
  }

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

  public async getAll(): Promise<{ dependencies: IDependency[], devDependencies: IDependency[] }> {
    const { dependencies: packageDependencies, devDependencies: packageDevDependencies } = this.projectPackageJSON;

    const getAll = async (list, dev) => {
      return await Promise.all(Object.entries(list).map(async ([_package, specifyVersion]: [string, string]) => {
        const localVersion = await this.getLocalVersion(_package);
        return {
          package: _package,
          specifyVersion,
          dev,
          localVersion
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
    npmOutdated.forEach(({ package: _package, wanted }: INpmOutdatedData) => {
      if (_package in dependencies) {
        dependencies[_package].wantedVestion = wanted;
      }
      if (_package in devDependencies) {
        devDependencies[_package].wantedVestion = wanted;
      }
    });

    return {
      dependencies,
      devDependencies
    };
  }
}
