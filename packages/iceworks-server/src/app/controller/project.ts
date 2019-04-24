import { controller, get, provide, inject } from 'midway';
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
  async current(ctx) {
    ctx.body = await this.service.getCurrent();
  }
}
