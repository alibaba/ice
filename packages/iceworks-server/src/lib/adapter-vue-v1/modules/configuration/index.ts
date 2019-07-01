import { baseModules } from '../../../adapter';
import getConfigSchema from './getConfigSchema';

export default class Configuration extends baseModules.Configuration {
  public cliConfFilename = 'vue.config.js';
  public getConfigSchema = getConfigSchema;

  constructor(params) {
    super(params);
  }
}
