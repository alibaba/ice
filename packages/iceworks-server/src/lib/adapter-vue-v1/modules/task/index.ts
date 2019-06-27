import baseAdapter from '../../../adapter';
import paramsConfig from './paramsConfig';

export default class Task extends baseAdapter.Task.module {
  public cliConfFilename = 'vue.config.js';

  public paramsConfig = paramsConfig;

  constructor(params) {
    super(params);
  }
}
