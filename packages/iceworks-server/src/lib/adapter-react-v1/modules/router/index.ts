import * as path from 'path';
import BaseAdapter from '../../../adapter';
import { IMenu, IProject, IMenuModule, IMenuOptions } from '../../../../interface';

const {module: BaseRouter} = BaseAdapter.Router;

export default class Router extends BaseRouter {
  public readonly path: string;
  public configFilePath = 'routerConfig.js';

  constructor(params: {project: IProject; storage: any; }) {
    super(params);
    this.path = path.join(this.project.path, 'src', this.configFilePath);
  }
}
