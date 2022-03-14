import { createStore } from 'ice';
import counter from './models/counter';
import title from './models/title';
import user from './models/user';

const store = createStore({ counter, title, user });

export default store;
