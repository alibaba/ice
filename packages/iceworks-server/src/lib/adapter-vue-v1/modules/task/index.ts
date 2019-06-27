import baseAdapter from '../../../adapter';
import taskConfig from './taskConfig';

export default class Task extends baseAdapter.Task.module {
  public cliConfFilename = 'vue.config.js';

  public taskConfig = taskConfig;

  constructor(params) {
    super(params);
  }
}
