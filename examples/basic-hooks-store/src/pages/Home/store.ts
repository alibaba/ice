import { createStore } from 'ice';
import userTodos from './hooks/userTodos';

const store = createStore({
  userTodos
});

export default store;
