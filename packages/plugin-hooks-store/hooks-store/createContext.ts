import { useContext, createContext, Context } from 'react';

export interface UseHooksStoreContext<T=any> {
  (): T;
}

export interface HooksStoreContextContent<T=any> {
  context: Context<T>;
  useContext: UseHooksStoreContext<T>;
}

export default function<T>(): HooksStoreContextContent<T> {
  const ReactHooksStoreContext = createContext(null);

  if (process.env.NODE_ENV !== 'production') {
    ReactHooksStoreContext.displayName = 'ReactHooksStore';
  }

  const useHooksStoreContext: UseHooksStoreContext = function () {
    const contextValue = useContext(ReactHooksStoreContext);

    if (process.env.NODE_ENV !== 'production' && !contextValue) {
      throw new Error(
        'could not find hooks-store context value; please ensure the component is wrapped in a <Provider>',
      );
    }

    return contextValue;
  };

  return {
    context: ReactHooksStoreContext,
    useContext: useHooksStoreContext,
  };
}
