import type { ForwardedRef } from 'react';
import { useEffect, useRef, forwardRef, cloneElement, Children, useCallback } from 'react';
import type { AppearProps } from '../typings';

const WeexAppear = forwardRef<any, AppearProps>((props, ref) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const childrenRef: ForwardedRef<HTMLDivElement> = ref ?? internalRef;

  const { children, onAppear, onDisappear } = props;

  const appearHandler = useCallback(
    (e: CustomEvent) => {
      onAppear?.(e);
    },
    [onAppear],
  );

  const disappearHandler = useCallback(
    (e: CustomEvent) => {
      onDisappear?.(e);
    },
    [onDisappear],
  );

  useEffect(() => {
    // Use copy of childrenRef to avoid ref value changed in cleanup phase.
    const nodeRef = typeof childrenRef === 'object' ? childrenRef.current : null;

    // Return early if onAppear callback not specified.
    onAppear && nodeRef?.addEventListener('appear', appearHandler);

    return () => {
      onAppear && nodeRef?.removeEventListener('appear', appearHandler);
    };
  }, [childrenRef, appearHandler, onAppear]);

  useEffect(() => {
    const nodeRef = typeof childrenRef === 'object' ? childrenRef.current : null;

    onDisappear && nodeRef?.addEventListener('disappear', disappearHandler);

    return () => {
      onDisappear && nodeRef?.removeEventListener('disappear', disappearHandler);
    };
  }, [childrenRef, onDisappear, disappearHandler]);

  return cloneElement(Children.only(children), { ref: childrenRef });
});

export default WeexAppear;
