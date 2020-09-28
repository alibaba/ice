import { createStore } from 'ice';

import modelA from './models/a';
import modelB from './models/b';

const store = createStore({
  a: modelA,
  b: modelB
});

export default store;
