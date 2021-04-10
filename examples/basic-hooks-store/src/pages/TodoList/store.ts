import { createHooksStore } from 'ice';
import useTodoList from './hooks/useTodoList';

const store = createHooksStore({
  useTodoList
});

export default store;
