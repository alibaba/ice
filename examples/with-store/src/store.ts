import { createStore } from 'ice';
import user from './models/user';
console.log('app store depend on window', window);
export default createStore({ user });
