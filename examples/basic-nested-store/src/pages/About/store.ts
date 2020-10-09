import { createStore } from 'ice';
import modelAbout from './model';

const store = createStore({
  about: modelAbout
});

export default store;
