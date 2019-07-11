import * as path from 'path';
import { baseModules } from '../../../adapter';
import getTaskConfig from './getTaskConfig';

export default class Task extends baseModules.Task {
  public cliConfFilename = 'vue.config.js';
  public cliConfPath: string;

  public getTaskConfig = getTaskConfig;

  constructor(params) {
    super(params);
    this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
  }
}
