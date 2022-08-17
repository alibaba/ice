import { createStore } from 'ice';
import counter from './models/counter';

const store = createStore({ counter });

export default store;
