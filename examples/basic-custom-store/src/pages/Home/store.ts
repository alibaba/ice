import { createStore } from 'ice';
import todo from './models/todo';

const models = {
  todo
};

const store = createStore(models);

export default store;
