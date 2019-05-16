import * as EventEmitter from 'events';
import { IConfigurationSettings } from '../../../interface';
import { CONFIGURATION_SETTINGS } from './const';

export default class Configuration extends EventEmitter {
  public readonly path: string;

  constructor(options) {
    super();
    this.path = options.path;
  }

  async getAll(): Promise<IConfigurationSettings[]> {
    return CONFIGURATION_SETTINGS;
  }
}
