import * as EventEmitter from 'events';
import * as path from 'path';
import { getCLIConf, setCLIConf } from '../utils/cliConf';
import { ICLIConf, IProject, IConfigurationModule, IConfParam } from '../../../interface';
import { CLI_CONF } from './const';

export default class Configuration extends EventEmitter implements IConfigurationModule {
  public project: IProject;

  public cliConfFilename: string = 'ice.config.js';

  public cliConfPath: string;

  constructor(project: IProject) {
    super();
    this.project = project;
    this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
  }

  async getCLIConf(): Promise<ICLIConf[]> {
   return getCLIConf(this.cliConfPath, CLI_CONF);
  }

  async setCLIConf(args: IConfParam) {
    return setCLIConf(this.cliConfPath, args.options);
  }
}
