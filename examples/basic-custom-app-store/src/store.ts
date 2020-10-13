// custom app store
import { createStore } from 'ice';
import user from './models/user';
import counter from './models/counter';

const models = {
  user,
  counter
};

const store = createStore(models, { disableImmer: true });

export default store;