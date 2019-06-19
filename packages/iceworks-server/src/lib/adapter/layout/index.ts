import * as path from 'path';
import { IProjectLayout, IProject, ILayoutModule } from '../../../interface';
import scanDirectory from '../../scanDirectory';

const DEFAULT_IMAGE = 'https://gw.alicdn.com/tfs/TB1Qby8ex9YBuNjy0FfXXXIsVXa-976-974.png';

export default class Layout implements ILayoutModule {
  public readonly title: string = '布局列表';
  public readonly description: string = '展示当前项目中 layouts 目录下的所有布局。';
  public readonly cover: string = 'https://img.alicdn.com/tfs/TB1KUD8c4iH3KVjSZPfXXXBiVXa-300-300.png';
  public readonly project: IProject;
  public storage: any;

  public readonly path: string;

  constructor(params: {project: IProject; storage: any; }) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.path = path.join(this.project.path, 'src', 'layouts');
  }

  private async scanLayout() {
    return Promise.all(
      (await scanDirectory(this.path)).map(async (dir) => {
        const fullPath = path.join(this.path, dir);
        const name = path.basename(fullPath);
        return {
          name,
          title: '自定义布局',
          description: `用户自定义布局 - ${name}`,
          screenshot: DEFAULT_IMAGE,
          thumbnail: DEFAULT_IMAGE,
        };
      })
    );
  }

  async getAll(): Promise<IProjectLayout[]> {
    return await this.scanLayout();
  }

  async getOne(layoutName: string): Promise<IProjectLayout> {
    const layouts = await this.getAll();
    const layout = layouts.find(({name}) => name === layoutName);
    return layout;
  }
}
