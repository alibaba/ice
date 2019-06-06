import * as EventEmitter from 'events';
import { IProject, IGitModule } from '../../../interface';

export default class Git extends EventEmitter implements IGitModule {
  public project: IProject;

  constructor(project: IProject) {
    super();
    this.project = project;
  }
}
