import * as path from 'path';
import { IProjectLayout, IProject, ILayoutModule, IContext } from '../../../../interface';
import scanDirectory from '../../../scanDirectory';

const DEFAULT_IMAGE = 'https://gw.alicdn.com/tfs/TB1Qby8ex9YBuNjy0FfXXXIsVXa-976-974.png';

export default class Layout implements ILayoutModule {
  public readonly project: IProject;
  public readonly path: string;
  public storage: any;

  constructor(params: {project: IProject; storage: any; }) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.path = path.join(this.project.path, 'src', 'layouts');
  }

  private async scanLayout(ctx) {
    const { i18n } = ctx;
    return Promise.all(
      (await scanDirectory(this.path)).map(async (dir) => {
        const fullPath = path.join(this.path, dir);
        const name = path.basename(fullPath);
        return {
          name,
          title: i18n.format('baseAdapter.layout.defaultTitle'),
          description: i18n.format('baseAdapter.layout.defaultDes', {name}),
          screenshot: DEFAULT_IMAGE,
          thumbnail: DEFAULT_IMAGE,
        };
      })
    );
  }

  async getAll(args, ctx: IContext): Promise<IProjectLayout[]> {
    return await this.scanLayout(ctx);
  }

  async getOne(layoutName: string, ctx: IContext): Promise<IProjectLayout> {
    const layouts = await this.getAll(null, ctx);
    const layout = layouts.find(({name}) => name === layoutName);
    return layout;
  }
}
