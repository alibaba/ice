import * as openFolder from 'open';
import * as openEditor from 'open-editor';
import storage from '../../../../lib/storage';

export default (app) => {
  const { Controller } = app;

  return class ProjectController extends Controller {
    async list() {
      const { projectManager } = app;
      return await projectManager.getProjects();
    }

    async create(ctx) {
      const { projectManager } = app;
      const { args } = ctx;

      return await projectManager.createProject(args);
    }

    async delete(ctx) {
      const { projectManager } = app;
      const { args } = ctx;

      return await projectManager.deleteProject(args);
    }

    async add(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const { projectPath } = args;
      return await projectManager.addProject(projectPath);
    }

    async getCurrent() {
      const { projectManager } = app;
      return await projectManager.getCurrent();
    }

    async setCurrent(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const { path } = args;

      return await projectManager.setCurrent(path);
    }

    async openFolder(ctx) {
      const { args: { path } } = ctx;
      return await openFolder(path);
    }

    async openEditor(ctx) {
      const { args: { path } } = ctx;
      const editor = storage.get('editor');
      return await openEditor([path], {
        editor: editor
      });

    }
  };
};
