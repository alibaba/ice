import { provide, plugin } from 'midway';
import { IDevSettings } from '../../interface';

@provide('configurationService')
export class ConfigurationService {
  @plugin('projectManager')
  private projectManager;

  async settings(projectFolderPath: string): Promise<IDevSettings> {
    const project = this.projectManager.getProject(projectFolderPath);

    const data = project ? await project.getConfigurationSettings() : [];

    return data;
  }
}
