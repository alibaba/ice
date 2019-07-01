import { baseModules } from '../../../adapter';
import getTaskConfig from './getTaskConfig';

export default class Task extends baseModules.Task {
  public cliConfFilename = 'vue.config.js';

  public getTaskConfig = getTaskConfig;

  constructor(params) {
    super(params);
  }
}
