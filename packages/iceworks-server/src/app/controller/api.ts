import { controller, get, post, provide, inject, plugin } from 'midway';
import { IPluginService } from '../../interface';

@provide()
@controller('/api/project')
export class ProjectController {
  @plugin('projectClient')
  projectClient;

  @get('/')
  async getAll(ctx) {
    ctx.body = {
      data: await this.projectClient.getProjects()
    };
  }

  @get('/current')
  async getCurrent(ctx) {
    ctx.body = {
      data: await this.projectClient.getCurrent()
    };
  }

  @post('/current')
  async setCurrent(ctx) {
    ctx.body = {
      data: await this.projectClient.setCurrent(ctx.request.body.folderPath)
    };
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
