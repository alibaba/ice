import { createStore } from 'ice';
import useUser from './hooks/useUser';

const store = createStore({
  useUser
});

export default store;
