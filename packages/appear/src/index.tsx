import { Children, useRef, useEffect, useCallback } from 'react';
import { isFunction } from './type';
import { observerElement, VisibilityChangeEvent } from './visibility';

function VisibilityChange(props: any, ref: any) {
  const {
    onAppear,
    onDisappear,
    children,
  } = props;

  const defaultRef = useRef();
  const visibilityRef = ref || defaultRef;

  const listen = useCallback((eventName: string, handler: Function) => {
    const { current } = visibilityRef;
    // Rax components will set custom ref by useImperativeHandle.
    // So We should get eventTarget by _nativeNode.
    // https://github.com/raxjs/rax-components/blob/master/packages/rax-textinput/src/index.tsx#L151
    if (current && isFunction(handler)) {
      const eventTarget = current._nativeNode || current;
      observerElement(eventTarget as HTMLElement);
      eventTarget.addEventListener(eventName, handler);
    }
    return () => {
      const { current } = visibilityRef;
      if (current) {
        const eventTarget = current._nativeNode || current;
        eventTarget.removeEventListener(eventName, handler);
      }
    };
  }, [visibilityRef]);

  useEffect(() => listen(VisibilityChangeEvent.appear, onAppear), [visibilityRef, onAppear, listen]);
  useEffect(() => listen(VisibilityChangeEvent.disappear, onDisappear), [visibilityRef, onDisappear, listen]);

  return Children.only({ ...children, visibilityRef });
}

export default VisibilityChange;
