import * as EventEmitter from 'events';
import { IProjectLayout, IProject } from '../../../interface';

export default class Layout extends EventEmitter {
  public readonly projectPath: string;

  constructor(project: IProject) {
    super();
    this.projectPath = project.path;
  }

  async getAll(): Promise<IProjectLayout[]> {
    return [
      {
        name: 'BasicLayout',
      },
    ];
  }
}
