import * as EventEmitter from 'events';
import { IDependency } from '../../../interface';

export default class Dependency extends EventEmitter {
  public readonly projectPath: string;

  constructor(options) {
    super();
    this.projectPath = options.projectPath;
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
