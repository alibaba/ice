import { provide, plugin } from 'midway';
import { IProjectDevSettings } from '../../interface';

@provide('configurationService')
export class ConfigurationService {
  @plugin('projectManager')
  private projectManager;

  async settings(projectFolderPath: string): Promise<IProjectDevSettings> {
    const project = this.projectManager.getProject(projectFolderPath);

    const data = project ? await project.getConfigurationSettings() : [];

    return data;
  }
}
