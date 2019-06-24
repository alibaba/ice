import * as path from 'path';
import { IProjectLayout, IProject, ILayoutModule } from '../../../interface';
import scanDirectory from '../../scanDirectory';
import config from '../config';

const DEFAULT_IMAGE = 'https://gw.alicdn.com/tfs/TB1Qby8ex9YBuNjy0FfXXXIsVXa-976-974.png';
const { title,  description, cover, isAvailable } = config['layout'];

export default class Layout implements ILayoutModule {
  public readonly title: string = title;
  public readonly description: string = description;
  public readonly cover: string = cover;
  public readonly isAvailable: boolean = isAvailable;
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
