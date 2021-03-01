import Dispatcher from './dispatcher';
import createContext from './createContext';
import createProvider from './createProvider';
import createUseHooks from './createUseHooks';
import createGetHooks from './createGetHooks';
import createWithHooks from './createWithHooks';
import { Hooks } from './types';

export const createStore = function<H extends Hooks>(hooks: H) {
  const dispatcher = new Dispatcher();
  const { context, useContext } = createContext<Dispatcher>();
  const Provider = createProvider(context, dispatcher, hooks);
  const useHooks = createUseHooks<H>(useContext);
  const getHooks = createGetHooks<H>(dispatcher);
  const withHooks = createWithHooks<H>(useHooks);

  return {
    Provider,
    useHooks,
    getHooks,
    withHooks,
  };
};

export default createStore;
