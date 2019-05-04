import { provide, plugin } from 'midway';
import { IPluginService, IPluginGetAllResult } from '../../interface';

@provide('pageService')
export class PageService implements IPluginService {
    @plugin('projectClient')
    private projectClient;

    async getAll(projectFolderPath: string): Promise<IPluginGetAllResult> {
        const project = this.projectClient.getProject(projectFolderPath);

        return {
            data: project ? await project.getPages() : []
        };
    }

    async getOne() {

    }

    async create() {

    }

    async delete() {

    }
}
