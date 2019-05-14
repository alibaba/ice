import { provide, plugin } from 'midway';
import { IProjectDevSettings } from '../../interface';

@provide('devService')
export class DevService {
  @plugin('projectManager')
  private projectManager;

  async getDevSettings(projectPath: string): Promise<IProjectDevSettings> {
    const project = this.projectManager.getProject(projectPath);

    const data = project ? await project.dev.getDevSettings() : [];

    return data;
  }
}
