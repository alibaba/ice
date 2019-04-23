
import projects from '@models/projects';
import materials from '@models/materials';
import Store from './store';

const store = new Store();
store.registerModel(projects);
store.registerModel(materials);

export default store;

export const useModel = store.useModel.bind(store);
