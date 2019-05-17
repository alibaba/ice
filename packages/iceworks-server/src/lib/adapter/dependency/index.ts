import * as EventEmitter from 'events';
import { IDependency, IProject } from '../../../interface';

export default class Dependency extends EventEmitter {
  public readonly projectPath: string;

  constructor(project: IProject) {
    super();
    this.projectPath = project.path;
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
