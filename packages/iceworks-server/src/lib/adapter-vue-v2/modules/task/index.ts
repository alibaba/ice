import * as path from 'path';
import { baseModules } from '../../../adapter';

export default class Task extends baseModules.Task {
  public cliConfFilename: string = 'vue.config.js';
  public cliConfPath: string;

  constructor(params) {
    super(params);
    this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
  }
}
