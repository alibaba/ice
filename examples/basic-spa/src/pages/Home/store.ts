import { createStore } from 'ice';
import model from './model';

const store = createStore({
  home: model
});

export default store;
