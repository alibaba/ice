import { createStore } from '@ice/runtime/iceStore';
import type { IcestoreDispatch, IcestoreRootState } from '@ice/runtime/iceStore';

const models = {};

const store = createStore(models);

export default store;
export type IRootDispatch = IcestoreDispatch<typeof models>;
export type IRootState = IcestoreRootState<typeof models>;
