import { createStore } from '@ice/store';
import model from './model';

const store = createStore({
  auth: model
});

export default store;
