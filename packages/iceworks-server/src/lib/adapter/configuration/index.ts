import * as EventEmitter from 'events';
import { IConfigurationSettings } from '../../../interface';
import { CONFIGURATION_SETTINGS } from './const';

export default class Configuration extends EventEmitter {
  public readonly projectPath: string;

  constructor(options) {
    super();
    this.projectPath = options.projectPath;
  }

  async getAll(): Promise<IConfigurationSettings[]> {
    return CONFIGURATION_SETTINGS;
  }
}
