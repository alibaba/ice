import { IRootDispatch, IRootState } from './store';

export default {
  state: {
    title: ''
  },

  reducers: {
    update (prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },

  effects: (dispatch: IRootDispatch) => ({
    async getPageTitle (playload, rootState: IRootState) {
      console.log({ playload, rootState });
      dispatch.about.update({
        title: 'About Page'
      });
    },
  }),
};
