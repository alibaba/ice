import { baseModules } from '../../../adapter';
import configSchema from './configSchema';

export default class Configuration extends baseModules.Configuration {
  public cliConfFilename = 'vue.config.js';
  public configSchema = configSchema;

  constructor(params) {
    super(params);
  }
}
