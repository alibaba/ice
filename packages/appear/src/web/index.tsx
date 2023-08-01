import { Children, useRef, useEffect, useCallback } from 'react';
import type { MutableRefObject } from 'react';

import { observerElement, VisibilityChangeEvent } from './visibility';

export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

function VisibilityChange(props: any) {
  const { onAppear, onDisappear, children } = props;

  const defaultRef: MutableRefObject<Node> = useRef<Node>();
  const ref: MutableRefObject<Node> = children && children.ref ? children.ref : defaultRef;

  const listen = useCallback(
    (eventName: string, handler: () => {}) => {
      const { current } = ref;
      // Rax components will set custom ref by useImperativeHandle.
      // So We should get eventTarget by _nativeNode.
      // https://github.com/raxjs/rax-components/blob/master/packages/rax-textinput/src/index.tsx#L151
      if (current && isFunction(handler)) {
        const eventTarget = current._nativeNode || current;
        observerElement(eventTarget as Element);
        eventTarget.addEventListener(eventName, handler);
      }
      return () => {
        const { current } = ref;
        if (current) {
          const eventTarget = current._nativeNode || current;
          eventTarget.removeEventListener(eventName, handler);
        }
      };
    },
    [ref],
  );

  useEffect(() => listen(VisibilityChangeEvent.appear, onAppear), [ref, onAppear, listen]);
  useEffect(() => listen(VisibilityChangeEvent.disappear, onDisappear), [ref, onDisappear, listen]);

  return Children.only({ ...children, ref });
}

export default VisibilityChange;
