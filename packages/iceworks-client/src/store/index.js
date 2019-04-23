
import projects from '@models/projects';
import project from '@models/project';
import materials from '@models/materials';
import Store from './store';

const store = new Store();
store.registerModel(project);
store.registerModel(projects);
store.registerModel(materials);

export default store;

export const useModel = store.useModel.bind(store);
