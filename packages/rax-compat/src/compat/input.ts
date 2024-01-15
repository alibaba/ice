import type { SyntheticEvent } from 'react';
import { createElement as _createElement, forwardRef, useCallback, useEffect, useRef, useState } from 'react';

/**
 * The rax compat version of input, which ignoring synthetic events.
 */
export const InputCompat = forwardRef((props: any, inputRef: any) => {
  const { value, onInput, onChange, inputType, ...rest } = props;

  const [v, setV] = useState(value);

  const changeCallback = useCallback(
    (event: SyntheticEvent) => {
      setV((event.target as HTMLInputElement).value);
      // Event of onInput should be native event.
      onInput && onInput(event.nativeEvent);
    },
    [onInput],
  );
  const defaultRef = useRef();
  const ref = inputRef || defaultRef;

  useEffect(() => {
    setV(value);
  }, [value]);

  // The onChange event is SyntheticEvent in React, but it is dom event in Rax, so it needs compat onChange.
  useEffect(() => {
    function valueChangeListener(e: Event) {
      setTimeout(() => {
        onChange?.(e);
        onInput?.(e);
        setV((e.target as HTMLInputElement).value);
      }, 0);
    }

    let eventTarget: EventTarget;
    if (ref && ref.current) {
      eventTarget = ref.current;
      eventTarget.addEventListener('change', valueChangeListener);
      eventTarget.addEventListener('input', valueChangeListener);
    }

    return () => {
      eventTarget?.removeEventListener('change', valueChangeListener);
      eventTarget?.removeEventListener('input', valueChangeListener);
    };
  }, [onChange, onInput, ref]);

  return _createElement(inputType, {
    ...rest,
    value: v ?? '',
    onChange: changeCallback,
    ref,
  });
});
