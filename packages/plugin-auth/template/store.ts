import { createStore } from '@ice/store';
import model from './model';

const store = createStore({
  role: model
});

export default store;
