import * as path from 'path';
import { getCLIConf, setCLIConf } from '../../utils/cliConf';
import { IConfSchema, IProject, IConfigurationModule, IConfParam, IContext, II18n } from '../../../../interface';
import getConfigSchema from './getConfigSchema';

export default class Configuration implements IConfigurationModule {
  public project: IProject;
  public storage: any;
  public readonly cliConfPath: string;
  public cliConfFilename = 'ice.config.js';
  public getConfigSchema: (ctx: IContext) => IConfSchema[] = getConfigSchema;

  constructor(params: {project: IProject; storage: any; }) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
  }

  async getCLIConf(args, ctx): Promise<IConfSchema[]> {
    return getCLIConf(this.cliConfPath, this.getConfigSchema(ctx));
  }

  async setCLIConf(args: IConfParam) {
    return setCLIConf(this.cliConfPath, args.options);
  }
}
