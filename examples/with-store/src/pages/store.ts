import { createStore } from '@ice/plugin-store/esm/runtime';
import counter from './models/counter';

const store = createStore({ counter });

export default store;
