import * as path from 'path';
import { getCLIConf, setCLIConf } from '../../utils/cliConf';
import { ICLIConf, IProject, IConfigurationModule, IConfParam } from '../../../../interface';
import paramsConfig from './paramsConfig';

export default class Configuration implements IConfigurationModule {
  public project: IProject;
  public storage: any;
  public readonly cliConfPath: string;
  public cliConfFilename = 'ice.config.js';
  public paramsConfig: any = paramsConfig;

  constructor(params: {project: IProject; storage: any; }) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
  }

  async getCLIConf(): Promise<ICLIConf[]> {
   return getCLIConf(this.cliConfPath, this.paramsConfig.CLI_CONF);
  }

  async setCLIConf(args: IConfParam) {
    return setCLIConf(this.cliConfPath, args.options);
  }
}
