import { provide, plugin } from 'midway';
import { IDevSettings } from '../../interface';

@provide('devService')
export class DevService {
  @plugin('projectManager')
  private projectManager;

  async getDevSettings(): Promise<IDevSettings> {
    const project = this.projectManager.getCurrent();

    return project ? await project.dev.getDevSettings() : [];
  }
}
