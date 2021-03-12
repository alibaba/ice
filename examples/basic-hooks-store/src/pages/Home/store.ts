import { createHooksStore } from 'ice';
import useA from './hooks/a';
import useB from './hooks/b';

const store = createHooksStore({
  useA,
  useB
});

export default store;
