export default {
  state: {
    title: 'Home Page'
  },
  reducers: {
    update(prevState, payload) {
      return { title: payload };
    },
  }
};
