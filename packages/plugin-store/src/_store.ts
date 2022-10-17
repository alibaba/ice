/**
 * This file which is imported by the runtime.tsx, is to avoid TS error.
 */
import type { IcestoreDispatch, IcestoreRootState } from '@ice/store';
import { createStore } from '@ice/store';

const models = {};

const store = createStore(models);

export default store;
export type IRootDispatch = IcestoreDispatch<typeof models>;
export type IRootState = IcestoreRootState<typeof models>;
