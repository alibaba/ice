import { useRef } from 'react';
export const useFnTimes = (fn: Function, times: number) => {
  const count = useRef(1);
  if (count.current <= times) {
    ++count.current;
    return fn;
  }
  return undefined;
};
