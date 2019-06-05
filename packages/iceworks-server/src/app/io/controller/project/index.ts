
import * as openFolder from 'open';
import * as openEditor from 'open-editor';
import * as path from 'path';
import storage from '../../../../lib/storage';
import scanDirectory from '../../../../lib/scanDirectory';

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

    async getWorkFolder() {
      const workFolder = storage.get('workFolder');
      const directories = await scanDirectory(workFolder);
      return {
        path: workFolder,
        directories,
      };
    }

    async setWorkFolder(ctx) {
      const { args } = ctx;
      const { path: setPath } = args;

      const workFolder = storage.get('workFolder');
      const newWorkFolder = path.join(workFolder, setPath);
      storage.set('workFolder', newWorkFolder);

      const directories = await scanDirectory(newWorkFolder);
      return {
        path: newWorkFolder,
        directories,
      };
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
