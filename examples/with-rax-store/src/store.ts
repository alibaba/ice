import { createStore } from 'rax-app';
import CounterModel from './models/counter';

const store = createStore({ counter: CounterModel })
export default store;
