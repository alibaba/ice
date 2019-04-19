import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { create } from 'redux-react-hook';
import logger from 'redux-logger';
import rootReducer from './reducers';

const preloadedState = { todos: ['Use Redux'] };
const middleware = [...getDefaultMiddleware(), logger];
const enhancers = [];

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  middleware,
  enhancers,
});

export const { StoreContext, useDispatch, useMappedState } = create();
