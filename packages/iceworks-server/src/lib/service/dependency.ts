import { provide } from 'midway';
import Project from '../adapter/project';
import { IPluginService, IPluginGetAllResult } from '../../interface';

@provide('dependencyService')
export class DependencyService implements IPluginService {
    async getAll(projectFolderPath: string): Promise<IPluginGetAllResult> {
        const project = new Project(projectFolderPath);
        return {
            data: await project.getDependencies()
        };
    }

    async getOne() {

    }

    async create() {

    }

    async delete() {

    }
}
