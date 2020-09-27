// custom app store
import { createStore } from '@ice/store';
import user from './models/user';
import title from './models/title';
import counter from './models/counter';

const models = {
  user,
  title,
  counter
};

const store = createStore(models);

export default store;
