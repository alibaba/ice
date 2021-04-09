import { createHooksStore, createStore } from 'ice';
import useUser from './hooks/useUser';

console.log(createHooksStore);//undefined
console.log(createStore);//fn



const store = createHooksStore({
  useUser
});

export default store;
