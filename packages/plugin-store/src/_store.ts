import { createStore, IcestoreDispatch, IcestoreRootState } from '@ice/store';

const models = {};

const store = createStore(models);

export default store;
export type IRootDispatch = IcestoreDispatch<typeof models>;
export type IRootState = IcestoreRootState<typeof models>;
