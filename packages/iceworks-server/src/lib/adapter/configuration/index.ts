import * as EventEmitter from 'events';
import { ICLIConf } from '../../../interface';
import { CLI_CONF } from './const';

export default class Configuration extends EventEmitter {
  public readonly path: string;

  constructor(options) {
    super();
    this.path = options.path;
  }

  async getCLIConf(): Promise<ICLIConf[]> {
    return CLI_CONF;
  }
}
