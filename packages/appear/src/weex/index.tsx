import type { ForwardedRef } from 'react';
import { useEffect, useRef, forwardRef, cloneElement, Children } from 'react';
import type { AppearProps } from '../typings';

const WeexAppear = forwardRef<any, AppearProps>((props, ref) => {
  const childrenRef: ForwardedRef<HTMLDivElement> = ref ?? useRef<HTMLDivElement>(null);
  const { children, onAppear, onDisappear } = props;

  useEffect(() => {
    // Use copy of childrenRef to avoid ref value changed in cleanup phase.
    const nodeRef = typeof childrenRef === 'object' ? childrenRef.current : null;

    // Return early if onAppear callback not specified.
    onAppear && nodeRef?.addEventListener('appear', (e: CustomEvent) => onAppear(e));

    return () => {
      onAppear && nodeRef?.removeEventListener('appear', (e: CustomEvent) => onAppear(e));
    };
  }, []);

  useEffect(() => {
    const nodeRef = typeof childrenRef === 'object' ? childrenRef.current : null;

    onDisappear && nodeRef?.addEventListener('disappear', (e: CustomEvent) => onDisappear(e));

    return () => {
      onDisappear && nodeRef?.removeEventListener('disappear', (e: CustomEvent) => onDisappear(e));
    };
  }, []);

  return cloneElement(Children.only(children), { ref: childrenRef });
});

export default WeexAppear;
