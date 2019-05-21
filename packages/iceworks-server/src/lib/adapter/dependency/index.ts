import * as EventEmitter from 'events';
import { IDependency, IProject } from '../../../interface';

export const install = async (dependency: IDependency): Promise<IDependency> => {
  return dependency;
};

export default class Dependency extends EventEmitter {
  public readonly projectPath: string;

  constructor(project: IProject) {
    super();
    this.projectPath = project.path;
  }

  async create(dependency: IDependency): Promise<IDependency> {
    return await install(dependency);
  }

  async getAll(): Promise<IDependency[]> {
    return [
      {
        package: 'icestore',
        dev: false,
        specifyVersion: '^0.1.0',
      },
    ];
  }
}
