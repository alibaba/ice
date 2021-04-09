import { createStore as createHooksStore } from '@ice/hooks-store';

const hooks = {};

const hooksStore = createHooksStore(hooks);

export default hooksStore;
