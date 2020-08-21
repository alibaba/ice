import { createStore } from 'ice';
import CounterModel from './counter';

const model = { counter: CounterModel };
const store = createStore(model);
export default store;
