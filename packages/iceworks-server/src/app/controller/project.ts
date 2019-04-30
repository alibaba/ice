import { controller, get, post, provide, inject } from 'midway';
import { IProjectService } from '../../interface';

@provide()
@controller('/api/project')
export class ProjectController {
  @inject('projectService')
  service: IProjectService;

  @get('/')
  async index(ctx) {
    ctx.body = await this.service.getProjects();
  }

  @get('/current')
  async getCurrent(ctx) {
    ctx.body = await this.service.getCurrent();
  }

  @post('/current')
  async setCurrent(ctx) {
    console.log('ctx.request.body', ctx.request.body);
    ctx.body = await this.service.setCurrent(ctx.request.body.folderPath);
  }
}
