import * as path from 'path';
import { baseModules } from '../../../adapter';
import getConfigSchema from './getConfigSchema';

export default class Configuration extends baseModules.Configuration {
  public cliConfFilename = 'vue.config.js';
  public getConfigSchema = getConfigSchema;

  public cliConfPath: string;

  constructor(params) {
    super(params);
    this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
  }
}
