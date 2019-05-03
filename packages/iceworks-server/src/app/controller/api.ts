import { controller, get, post, provide, inject } from 'midway';
import { IProjectsService } from '../../interface';

@provide()
@controller('/api/project')
export class ProjectController {
  @inject('projectsService')
  projectsService: IProjectsService;

  @get('/')
  async index(ctx) {
    ctx.body = await this.projectsService.getProjects();
  }

  @get('/current')
  async getCurrent(ctx) {
    ctx.body = await this.projectsService.getCurrent();
  }

  @post('/current')
  async setCurrent(ctx) {
    console.log('ctx.request.body', ctx.request.body);
    ctx.body = await this.projectsService.setCurrent(ctx.request.body.folderPath);
  }
}
