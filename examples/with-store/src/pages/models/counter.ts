import { createModel } from '@ice/plugin-store/esm/runtime';

export default createModel({
  state: {
    count: 0,
  },
  reducers: {
    inc(prevState, count = 1) {
      prevState.count += count;
    },
    dec(prevState, count = 1) {
      prevState.count -= count;
    },
  },
});
