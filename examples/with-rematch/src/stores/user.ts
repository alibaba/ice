export default {
  state: {
    stars: 0
  },
  reducers: {
    updateStars(state, count) {
      return {...state, stars: state.stars + count};
    },
  },
  effects: (dispatch) => ({
    async updateStarsAsync(count) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch.user.updateStars(count);
    },
  }),
};
