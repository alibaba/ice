import { provide } from 'midway';
import Project from '../adapter/project';
import { IPluginService, IPluginGetAllResult } from '../../interface';

@provide('pageService')
export class PageService implements IPluginService {
    async getAll(projectFolderPath: string): Promise<IPluginGetAllResult> {
        const project = new Project(projectFolderPath);
        return {
            data: await project.getPages()
        };
    }

    async getOne() {

    }

    async create() {

    }

    async delete() {

    }
}
