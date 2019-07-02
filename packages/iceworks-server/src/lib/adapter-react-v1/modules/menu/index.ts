import * as path from 'path';
import BaseAdapter from '../../../adapter';
import { IProject } from '../../../../interface';

const {module: BaseMenu} = BaseAdapter.Menu;

export default class Menu extends BaseMenu {
  public readonly path: string;
  public configFilePath = 'menuConfig.js';

  constructor(params: {project: IProject; storage: any; }) {
    super(params);
    this.path = path.join(this.project.path, 'src', this.configFilePath);
  }
}
