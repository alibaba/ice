import { controller, get, post, provide, inject } from 'midway';
import { IProjectService, IPluginService } from '../../interface';

@provide()
@controller('/api/project')
export class ProjectController {
  @inject('projectService')
  projectService: IProjectService;

  @get('/')
  async getAll(ctx) {
    ctx.body = await this.projectService.getProjects();
  }

  @get('/current')
  async getCurrent(ctx) {
    ctx.body = await this.projectService.getCurrent();
  }

  @post('/current')
  async setCurrent(ctx) {
    ctx.body = await this.projectService.setCurrent(ctx.request.body.folderPath);
  }
}

@provide()
@controller('/api/page')
export class PageController {
  @inject('pageService')
  pageService: IPluginService;

  @get('/')
  async getAll(ctx) {
    ctx.body = await this.pageService.getAll(ctx.query.projectFolderPath);
  }
}

@provide()
@controller('/api/dependency')
export class DependencyController {
  @inject('dependencyService')
  dependencyService: IPluginService;

  @get('/')
  async getAll(ctx) {
    ctx.body = await this.dependencyService.getAll(ctx.query.projectFolderPath);
  }
}
