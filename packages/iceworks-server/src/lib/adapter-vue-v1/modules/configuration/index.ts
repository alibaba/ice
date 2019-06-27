import baseAdapter from '../../../adapter';
import configSchema from './configSchema';

export default class Configuration extends baseAdapter.Configuration.module {
  public cliConfFilename = 'vue.config.js';
  public configSchema = configSchema;

  constructor(params) {
    super(params);
  }
}
