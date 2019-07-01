import { baseModules } from '../../../adapter';
import taskConfig from './taskConfig';

export default class Task extends baseModules.Task {
  public cliConfFilename = 'vue.config.js';

  public taskConfig = taskConfig;

  constructor(params) {
    super(params);
  }
}
