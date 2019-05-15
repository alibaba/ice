import { provide, plugin } from 'midway';

@provide('dependencyService')
export class DependencyService {
  @plugin('projectManager')
  private projectManager;

  async getAll() {
    const project = this.projectManager.getCurrent();
    return project ? await project.dependency.getDependencies() : [];
  }

  async getOne() {}

  async create() {}

  async delete() {}
}
