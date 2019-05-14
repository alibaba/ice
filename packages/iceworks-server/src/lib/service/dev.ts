import { provide, plugin } from 'midway';
import { IProjectDevSettings } from '../../interface';

@provide('devService')
export class DevService {
  @plugin('projectManager')
  private projectManager;

  async getDevSettings(): Promise<IProjectDevSettings> {
    const project = this.projectManager.getCurrent();

    return project ? await project.dev.getDevSettings() : [];
  }
}
