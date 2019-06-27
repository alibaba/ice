import * as path from 'path';
import RouterAdapter from '../../../adapter/modules/router';
import { IMenu, IProject, IMenuModule, IMenuOptions } from '../../../../interface';

export default class Router extends RouterAdapter {
  public readonly path: string;
  public configFilePath = 'routerConfig.js';

  constructor(params: {project: IProject; storage: any; }) {
    super(params);
    this.path = path.join(this.project.path, 'src', this.configFilePath);
  }
}
