import baseAdapter from '../../../adapter';
import paramsConfig from './paramsConfig';

export default class Configuration extends baseAdapter.Configuration.module {
  public cliConfFilename = 'vue.config.js';
  public paramsConfig = paramsConfig;

  constructor(params) {
    super(params);
  }
}
