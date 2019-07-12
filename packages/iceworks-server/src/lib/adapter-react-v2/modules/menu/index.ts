import * as path from 'path';
import { baseModules } from '../../../adapter';
import { IProject } from '../../../../interface';

export default class Menu extends baseModules.Menu {
  public readonly path: string;
  public configFilePath = 'menuConfig.js';

  constructor(params: {project: IProject; storage: any; }) {
    super(params);
    this.path = path.join(this.project.path, 'src', this.configFilePath);
  }
}
