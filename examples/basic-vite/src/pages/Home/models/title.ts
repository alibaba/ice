export default {
  state: {
    title: '🚀 Vite + Icejs'
  },
  reducers: {
    update(prevState, payload) {
      return { title: payload };
    },
  }
};
