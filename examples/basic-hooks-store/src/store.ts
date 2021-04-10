import { createHooksStore } from 'ice';
import useUser from './hooks/useUser';

const store = createHooksStore({
  useUser
});

export default store;
