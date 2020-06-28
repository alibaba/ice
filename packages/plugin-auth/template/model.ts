export default {
  state: {},

  reducers: {
    setAuth (state, payload) {
      return {
        ...state,
        ...payload
      };
    }
  }
};
