import * as path from 'path';
import MenuAdapter from '../../../adapter/modules/menu';
import { IMenu, IProject, IMenuModule, IMenuOptions } from '../../../../interface';

export default class Menu extends MenuAdapter {
  public readonly path: string;
  public configFilePath = 'menuConfig.js';

  constructor(params: {project: IProject; storage: any; }) {
    super(params);
    this.path = path.join(this.project.path, 'src', this.configFilePath);
  }
}
