import { provide, plugin } from 'midway';
import { IProjectDevSettings } from '../../interface';

@provide('devService')
export class DevService {
  @plugin('projectManager')
  private projectManager;

  async getDevSettings(
    projectFolderPath: string
  ): Promise<IProjectDevSettings> {
    const project = this.projectManager.getProject(projectFolderPath);

    const data = project ? await project.getDevSettings() : [];

    return data;
  }
}
