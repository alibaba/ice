import { createStore, IcestoreDispatch, IcestoreRootState } from '@ice/store';

const models = {};

const store = createStore(models);

export default store;
export type Store = typeof store;
export type RootDispatch = IcestoreDispatch<typeof models>;
export type RootState = IcestoreRootState<typeof models>;

