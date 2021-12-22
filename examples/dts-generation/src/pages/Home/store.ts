import { createStore } from 'ice';
import counter from './models/counter';

const models = { counter };

export default createStore(models);
