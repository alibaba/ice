import { createStore } from 'rax-app';
import CounterModel from './models/counter';

const model = { 'counter': CounterModel };
const store = createStore(model);
export default store;
