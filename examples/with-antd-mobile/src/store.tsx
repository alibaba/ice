import type { ComponentWithChildren } from '@ice/runtime/esm/types';
import { useState } from 'react';
import constate from 'constate';

function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);

  return { count, increment, decrement };
}

const [CounterProvider, useCounterContext] = constate(useCounter);

export const StoreProvider: ComponentWithChildren = ({ children }) => {
  return <CounterProvider>{ children } </CounterProvider>;
};

export {
  useCounterContext,
};