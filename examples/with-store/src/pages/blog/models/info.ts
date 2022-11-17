import { createModel } from 'ice';

export default createModel({
  state: {
    title: 'ICE Blog',
    posts: [
      { title: 'First Post', id: 'first-post' },
    ],
  },
});
