import * as path from 'path';
import { getCLIConf, setCLIConf } from '../../utils/cliConf';
import { IConfSchema, IProject, IConfigurationModule, IConfParam } from '../../../../interface';
import configSchema from './configSchema';

export default class Configuration implements IConfigurationModule {
  public project: IProject;
  public storage: any;
  public readonly cliConfPath: string;
  public cliConfFilename = 'ice.config.js';
  public configSchema: IConfSchema[] = configSchema;

  constructor(params: {project: IProject; storage: any; }) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
  }

  async getCLIConf(): Promise<IConfSchema[]> {
   return getCLIConf(this.cliConfPath, this.configSchema);
  }

  async setCLIConf(args: IConfParam) {
    return setCLIConf(this.cliConfPath, args.options);
  }
}
