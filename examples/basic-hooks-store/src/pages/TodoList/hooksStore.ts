import { createHooksStore } from 'ice';
import useTodoList from './hooks/useTodoList';

const hooksStore = createHooksStore({
  useTodoList
});

export default hooksStore;
