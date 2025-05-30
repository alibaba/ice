import type { ForwardedRef } from 'react';
import { useEffect, useRef, forwardRef, cloneElement, Children } from 'react';
import type { AppearProps } from '../typings';

const WeexAppear = forwardRef<any, AppearProps>((props, ref) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const childrenRef: ForwardedRef<HTMLDivElement> = ref ?? internalRef;

  const { children, onAppear, onDisappear } = props;

  useEffect(() => {
    // Use copy of childrenRef to avoid ref value changed in cleanup phase.
    const nodeRef = typeof childrenRef === 'object' ? childrenRef.current : null;

    const appearHandler = (e: CustomEvent) => {
      onAppear?.(e);
    };
    // Return early if onAppear callback not specified.
    onAppear && nodeRef?.addEventListener('appear', appearHandler);

    return () => {
      onAppear && nodeRef?.removeEventListener('appear', appearHandler);
    };
  }, [childrenRef, onAppear]);

  useEffect(() => {
    const nodeRef = typeof childrenRef === 'object' ? childrenRef.current : null;

    const disappearHandler = (e: CustomEvent) => {
      onDisappear?.(e);
    };

    onDisappear && nodeRef?.addEventListener('disappear', disappearHandler);

    return () => {
      onDisappear && nodeRef?.removeEventListener('disappear', disappearHandler);
    };
  }, [childrenRef, onDisappear]);

  return cloneElement(Children.only(children), { ref: childrenRef });
});

export default WeexAppear;
