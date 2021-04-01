import { createHooksStore } from 'ice';
import useCounter from './hooks/useCounter';
import useTitle from './hooks/useTitle';

const store = createHooksStore({
  useCounter,
  useTitle
});

export default store;
