import { createStore as createHooksStore } from '@ice/hooks-store';

const hooks = {};

const store = createHooksStore(hooks);

export default store;
