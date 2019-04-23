
import projects from '@models/projects';
import project from '@models/currentProject';
import materials from '@models/materials';
import Store from './store';

const store = new Store();
store.registerModel('project', project);
store.registerModel('projects', projects);
store.registerModel('materials', materials);

export default store;

export const useModel = store.useModel.bind(store);
