import { useEffect, useRef, forwardRef, cloneElement, Children } from 'react';
import type { AppearProps } from '../typings';

const WeexAppear = forwardRef<any, AppearProps>((props, ref) => {
  const childrenRef = ref || useRef<HTMLDivElement>(null);
  const { children, onAppear, onDisappear } = props;

  useEffect(() => {
    onAppear &&
      typeof childrenRef === 'object' &&
      childrenRef.current?.addEventListener('appear', (e: CustomEvent) => onAppear(e));
    return () => {
      onAppear &&
        typeof childrenRef === 'object' &&
        childrenRef.current?.removeEventListener('appear', (e: CustomEvent) => onAppear(e));
    };
  }, []);

  useEffect(() => {
    onDisappear &&
      typeof childrenRef === 'object' &&
      childrenRef.current?.addEventListener('disappear', (e: CustomEvent) => onDisappear(e));

    return () => {
      onDisappear &&
        typeof childrenRef === 'object' &&
        childrenRef.current?.removeEventListener('disappear', (e: CustomEvent) => onDisappear(e));
    };
  }, []);

  return cloneElement(Children.only(children), { ref: childrenRef });
});

export default WeexAppear;
