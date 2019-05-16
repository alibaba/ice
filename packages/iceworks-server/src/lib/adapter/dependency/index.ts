import * as EventEmitter from 'events';
import { IDependency } from '../../../interface';

export default class Dependency extends EventEmitter {
  public readonly path: string;

  constructor(options) {
    super();
    this.path = options.path;
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
