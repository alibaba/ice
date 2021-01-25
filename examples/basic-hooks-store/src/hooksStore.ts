import { createHooksStore } from 'ice';
import useUser from './hooks/useUser';

const hooksStore = createHooksStore({
  useUser
});

export default hooksStore;
