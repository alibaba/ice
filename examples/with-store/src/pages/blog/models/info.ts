import { createModel } from '@ice/plugin-store/esm/runtime';

export default createModel({
  state: {
    title: 'ICE Blog',
    posts: [
      { title: 'First Post', id: 'first-post' },
    ],
  },
});
