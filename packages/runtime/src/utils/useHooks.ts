import { useRef } from 'react';

const useOnce = (callback: Function) => {
  const ref = useRef(null);

  if (!ref.current) {
    ref.current = callback();
  }
  return ref.current;
};

export {
  useOnce,
};
