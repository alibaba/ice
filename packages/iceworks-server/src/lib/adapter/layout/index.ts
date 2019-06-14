import * as path from 'path';
import { IProjectLayout, IProject, ILayoutModule } from '../../../interface';
import scanDirectory from '../../scanDirectory';

const DEFAULT_IMAGE = 'https://gw.alicdn.com/tfs/TB1Qby8ex9YBuNjy0FfXXXIsVXa-976-974.png';

export default class Layout implements ILayoutModule {
  public project: IProject;
  public storage: any;

  public readonly path: string;

  constructor(params: {project: IProject; storage: any;}) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.path = path.join(this.project.path, 'src', 'layouts');
  }

  private async scanLayout(dirPath: string) {
    return Promise.all(
      (await scanDirectory(dirPath)).map(async (dir) => {
        const fullPath = path.join(dirPath, dir);
        const name = path.basename(fullPath);
        return {
          name,
          title: '自定义布局',
          description: `用户自定义布局 - ${name}`,
          screenshot: DEFAULT_IMAGE,
          thumbnail: DEFAULT_IMAGE,
        };
      })
    )
  }

  async getAll(): Promise<IProjectLayout[]> {
    return await this.scanLayout(this.path);
  }

  async getOne(layoutName: string): Promise<IProjectLayout> {
    return;
  }
}
