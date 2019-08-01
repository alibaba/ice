import * as path from 'path';
import { baseModules } from '../../../adapter';
import getConfigSchema from './getConfigSchema';

export default class Configuration extends baseModules.Configuration {
  public cliConfFilename: string = 'vue.config.js';

  public cliConfPath: string;

  public getConfigSchema = getConfigSchema;

  constructor(params) {
    super(params);
    this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
  }
}
