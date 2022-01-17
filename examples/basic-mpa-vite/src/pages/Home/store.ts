import { createStore } from 'ice';
import model from './model';

const store = createStore({ default: model });

export default store;
