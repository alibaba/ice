import { createStore } from 'ice';
import counter from './models/counter';

const models = { counter };
const store = createStore(models);

export default store;
