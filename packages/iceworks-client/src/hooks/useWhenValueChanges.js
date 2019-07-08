import { useEffect, useRef } from 'react';

export default function useWhenValueChanges(
  value,
  callback,
  isEqual = (a, b) => a === b,
) {
  const previous = useRef(value);
  useEffect(() => {
    if (!isEqual(value, previous.current)) {
      callback();
      previous.current = value;
    }
  });
}
