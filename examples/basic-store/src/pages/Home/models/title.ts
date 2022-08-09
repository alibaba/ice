import { createModel } from 'ice';

export default createModel({
  state: {
    title: 'Home Page'
  },
  reducers: {
    update(prevState, payload) {
      return { title: payload };
    },
  }
});
