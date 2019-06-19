import * as path from 'path';
import { getCLIConf, setCLIConf } from '../utils/cliConf';
import { ICLIConf, IProject, IConfigurationModule, IConfParam } from '../../../interface';
import { CLI_CONF } from './const';

export default class Configuration implements IConfigurationModule {
  public readonly title: string = '工程配置';
  public readonly description: string = '工程相关配置的管理。';
  public readonly cover: string = '';
  public project: IProject;
  public storage: any;

  public readonly cliConfPath: string;

  private cliConfFilename = 'ice.config.js';

  constructor(params: {project: IProject; storage: any; }) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
  }

  async getCLIConf(): Promise<ICLIConf[]> {
   return getCLIConf(this.cliConfPath, CLI_CONF);
  }

  async setCLIConf(args: IConfParam) {
    return setCLIConf(this.cliConfPath, args.options);
  }
}
