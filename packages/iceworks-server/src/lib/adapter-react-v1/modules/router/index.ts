import * as path from 'path';
import { baseModules } from '../../../adapter';
import { IProject } from '../../../../interface';

export default class Router extends baseModules.Router {
  public readonly path: string;
  public configFilePath = 'routerConfig.js';

  constructor(params: {project: IProject; storage: any; }) {
    super(params);
    this.path = path.join(this.project.path, 'src', this.configFilePath);
  }
}
