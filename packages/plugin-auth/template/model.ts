export default {
  state: {
    auth: {}
  },

  reducers: {
    setAuth (state, payload) {
      return {
        ...state,
        ...payload
      };
    }
  }
};
